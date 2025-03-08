const express = require("express");
const BookModel = require("../Modals/Book");
const Authenticated = require('../middleware/auth');
const router = express.Router()
require('dotenv').config();

//ROUTE 1: add new book
router.post('/add', async (req, res) => {
    const { title, description, genre, author, author_img, imgSrc, buy_link } = req.body;

    try {
        const newBook = new BookModel({
            title,
            description,
            genre,
            author,
            author_img,
            imgSrc,
            buy_link,
        });

        await newBook.save();
        res.status(201).json({ success: true, message: "Book added successfully", book: newBook });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

//ROUTE 2: get all books
router.get('/all', async (req, res) => {

    try {
        const totalBooks = await BookModel.countDocuments();
        const books = await BookModel.aggregate([{ $sample: { size: totalBooks } }]);
        res.json({ message: "All Books (Shuffled)", books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//ROUTE 3: get a specific book by id
router.get('/:bookId', Authenticated, async (req, res) => {
    const id = req.params.bookId;

    try {
        // Fetch the book by ID
        let book = await BookModel.findById(id);

        if (!book) {
            return res.json({ message: "Book not found" });
        }

        // Return the book details and reviews (if any)
        res.json({ message: "Specific Book", book });

    } catch (error) {
        console.error(error);
        res.json({ message: error.message });
    }
});

//ROUTE 4: add new review to a book
router.post('/addreview', async (req, res) => {
    const { userId, username, reviewDesc, rating, bookId } = req.body;

    if (!userId || !username || !reviewDesc) {
        return res.status(400).json({ message: "Review cannot be empty" });
    }
    if (!rating) {
        return res.status(400).json({ message: "Please select the star rating" });
    }

    try {
        const book = await BookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // Check if the user has already reviewed this book
        const existingReview = book.reviews.find(review => review.userId.toString() === userId);
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this book" });
        }

        const newReview = {
            userId,
            username,
            reviewDesc,
            rating
        };

        book.reviews.push(newReview);
        await book.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//ROUTE 5: add new chat to a book
router.post('/addchat', async (req, res) => {
    const { userId, username, chatText, bookId } = req.body;

    if (!userId || !username || !chatText) {
        return res.status(400).json({ message: "Message cannot be empty" });
    }

    try {
        const book = await BookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const newChat = {
            userId,
            username,
            chatText
        };

        book.chats.push(newChat);
        await book.save();

        res.status(201).json({ message: "Public Chat added successfully", chats: newChat });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//ROUTE 6: adding new member in the club
router.post('/joinclub', Authenticated, async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await BookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // Check if user is already a member
        const isMember = book.members.some(member => member.userId.equals(req.user._id));
        if (isMember) {
            return res.status(400).json({ message: "You are already a member of this club" });
        }

        const newMember = {
            userId: req.user._id,
            username: req.user.username,
        };

        book.members.push(newMember);
        await book.save();

        res.status(201).json({ message: "Welcome to the club!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ROUTE 7: removing a member from the club
router.post('/leaveclub', Authenticated, async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await BookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // Check if user is already a member
        const memberIndex = book.members.findIndex(member => member.userId.equals(req.user._id));

        if (memberIndex === -1) {
            return res.status(400).json({ message: "You are not a member of this club" });
        }

        // Remove the user from the club
        book.members.splice(memberIndex, 1);
        await book.save();

        res.status(200).json({ message: "You have left this club" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//ROUTE 8: Delete all data of a specific book
router.post('/delete', Authenticated, async (req, res) => {
    const { bookId } = req.body;
    if (req.user.role === 'admin') {
        try {
            const book = await BookModel.findByIdAndDelete(bookId);
            if (!book) return res.status(404).json({ message: "Book not found" });

            res.status(201).json({ message: "Book data has been deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(500).json({ message: 'Unauthorized User Access' });
    }
});



// Function to calculate TF
function calculateTF(terms) {
    const tf = {};
    terms.forEach(term => {
        tf[term] = (tf[term] || 0) + 1;
    });
    const totalTerms = terms.length;
    Object.keys(tf).forEach(term => {
        tf[term] /= totalTerms;  
    });
    return tf;
}

// Function to calculate IDF
function calculateIDF(allBooksGenres) {
    const idf = {};
    const numDocuments = allBooksGenres.length;

    allBooksGenres.forEach(genreList => {
        const uniqueTerms = new Set(genreList);
        uniqueTerms.forEach(term => {
            idf[term] = (idf[term] || 0) + 1;
        });
    });

    Object.keys(idf).forEach(term => {
        idf[term] = Math.log(numDocuments / (idf[term] + 1));  // Smoothing to avoid zero division
    });

    return idf;
}

// Function to compute TF-IDF scores
function computeTFIDF(bookGenres, idf) {
    return bookGenres.map(genreList => {
        const tf = calculateTF(genreList);
        const tfidf = {};
        Object.keys(tf).forEach(term => {
            tfidf[term] = tf[term] * (idf[term] || 0);
        });
        return tfidf;
    });
}

// ROUTE: Recommendation using TF-IDF
router.post("/recommend", async (req, res) => {
    try {
        const { genre } = req.body;
        if (!genre) return res.status(400).json({ error: "Genre is required" });

        const books = await BookModel.find({});
        if (!books.length) return res.status(404).json({ error: "No books found" });

        // Preprocess book genres
        const allBookGenres = books.map(book => book.genre.toLowerCase().split(/\s+/));  // Tokenizing

        // Compute IDF
        const idf = calculateIDF(allBookGenres);

        // Compute TF-IDF for each book
        const tfidfScores = computeTFIDF(allBookGenres, idf);

        // Compute query TF-IDF
        const queryTerms = genre.toLowerCase().split(/\s+/);
        const queryTF = calculateTF(queryTerms);
        const queryTFIDF = {};
        Object.keys(queryTF).forEach(term => {
            queryTFIDF[term] = queryTF[term] * (idf[term] || 0);
        });

        // Calculate cosine similarity 
        const scores = books.map((book, index) => {
            const bookTFIDF = tfidfScores[index];

            // Compute dot product
            let dotProduct = 0;
            let bookMagnitude = 0;
            let queryMagnitude = 0;

            Object.keys(queryTFIDF).forEach(term => {
                if (bookTFIDF[term]) {
                    dotProduct += bookTFIDF[term] * queryTFIDF[term];
                }
                queryMagnitude += queryTFIDF[term] ** 2;
            });

            Object.values(bookTFIDF).forEach(value => {
                bookMagnitude += value ** 2;
            });

            bookMagnitude = Math.sqrt(bookMagnitude);
            queryMagnitude = Math.sqrt(queryMagnitude);

            const similarity = bookMagnitude && queryMagnitude ? dotProduct / (bookMagnitude * queryMagnitude) : 0;

            return { book, score: similarity };
        });

        // Sort books by similarity score in descending order
        scores.sort((a, b) => b.score - a.score);
        
        // Return sorted books
        res.json(scores.map(entry => entry.book));

    } catch (error) {
        console.error("Error in recommendation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
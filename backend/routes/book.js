const express = require("express");
const BookModel = require("../Modals/Book");
const router = express.Router()
require('dotenv').config();

//ROUTE 1: add new book
router.post('/add', async (req, res) => {
    const { title, description, genre, author, author_img, imgSrc, buy_link } = req.body;

    if (!title || !description || !genre || !author) {
        return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

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
router.get('/:bookId', async (req, res) => {
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

//ROUTE 3: add new review to a book
router.post('/addreview', async (req, res) => {
    const { userId, username, reviewDesc, bookId } = req.body;

    if (!userId || !username || !reviewDesc) {
        return res.status(400).json({ message: "Review cannot be empty" });
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
            reviewDesc
        };

        book.reviews.push(newReview);
        await book.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//ROUTE 4: add new chat to a book
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

module.exports = router;
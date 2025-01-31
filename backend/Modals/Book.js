const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    author: String,
    author_img: String,
    reviews: [
        {
            userId: mongoose.Schema.Types.ObjectId,
            username: String,
            reviewDesc: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    chats: [
        {
            userId: mongoose.Schema.Types.ObjectId,
            username: String,
            chatText: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    imgSrc: String,
    buy_link: String,
    createdAt: { type: Date, default: Date.now }
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;

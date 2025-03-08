const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    author: String,
    author_img: String,
    members: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            username: String
        }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            username: String,
            reviewDesc: String,
            rating: Number,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    chats: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

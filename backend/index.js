const express = require("express") //importing express js
const mongoose = require("mongoose") //importing mongodb database
const cors = require("cors") //for making connection between frontend and backend (Cross-Origin Resource Sharing)
const cookieParser = require('cookie-parser'); //for handling loggedin user

//for using environmental variables (getting values from '.env' file)
require('dotenv').config();
const PORT = process.env.PORT

// Database Connection Settings
mongoose.connect('mongodb://localhost:27017/TheBookWorm')
    .catch((error) => {
        console.error("DB connection error:", error);
    });

// Using the imported items (express,cors,cookieParser)
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: [
        'http://localhost:3000',
    ], 
    credentials: true // Allow credentials like cookies and authorization headers
}));


// Checking whether the backend is running properly or not
app.listen(PORT, () => {
    console.log("\nServer is running on PORT:", PORT)
})



////////////////////////     ALL MAIN ROUTES ARE BELOW      //////////////////////

//for handling Users
app.use('/api/user', require('./routes/user'))

//for handling Books
app.use('/api/book', require('./routes/book'))
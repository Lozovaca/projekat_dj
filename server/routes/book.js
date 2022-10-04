const express = require("express");
const router = express.Router();
const dbo = require("../db.js");
const mongoose = require("mongoose");
const bookController = require("../controllers/booksController");
const Book = mongoose.model("book");
console.log("Usao u book.js");
router.get('/getBook',bookController.getBooks);


module.exports = router;
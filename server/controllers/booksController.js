const mongoose = require("mongoose");
const e = require("express");
const Book = mongoose.model('book');

module.exports.getBooks = function (req,res) 
{
    console.log("Usao u bookController");
    let title = req.body;
    console.log(Book);
    Book.findOne({}).exec((err, books) => {
  if (err) return handleError(err);
  else {
    console.log(books);
    res.status(200).json(books);
  }
});
}
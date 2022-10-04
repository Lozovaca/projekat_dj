const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
const mongoose = require('./db.js');
app.use(cors());
app.use(express.json());
app.use(require("./routes/book")); 
require('./models/Book');
var books = require('./routes/book.js');
app.use('/books',books);
app.listen(process.env.PORT,()=>{
  console.log(`Server started at port: ${process.env.PORT} `);
});

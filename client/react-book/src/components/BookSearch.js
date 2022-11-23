import React, { useState, useEffect } from "react";
import { Form, renderMatches } from "react-router-dom";
import bookService from "../services/book-service";

const SearchBook  = ()=> {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError]   = useState("");
  const [books_s, setSearchedBooks]   = useState([]);

  const searchBooks = async (e) => {
    e.preventDefault();

   
    try {
        if(title == "" && authors == "" && category == ""){
            setError("Morate uneti barem jedan parametar");
            return
        }
    
        bookService.search_books(title,authors,category).then(
         (books) => {
            setSearchedBooks(books);
            if(books.length ==0 ) setError("There is no book with that params");
            
           
         },
         (error) => {
            
           setError('No books with that params')
           console.log(error);
         }
       );
     } catch (err) {
       //setError('Invalid Username or Password')
       console.log(err);
     }
    // if(title == "" && authors == "" && category == ""){
    //     setError("Morate uneti barem jedan parametar");
    // } else {
    // const searched_books = []
    // searched_books = bookService.search_books(title,authors,category);
    // if(searched_books.empty()) {
    //     setError("Knjiga sa trazenim parametrima ne postoji");
    // } else {
    //     setSearchedBooks(books_s);
    //     window.location.reload(false);
    // }
    //window.location.reload();
    
  }
  

  return (
    <><div>
          <h6 className="text-center mb-4">Pretrazite knjige</h6>
          <section className="search-sec">
              <div className="container">
                  <form onSubmit={searchBooks}>
                      <div className="row">
                          <div className="col-lg-12">
                              <div className="row">

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <input
                                          type="text"
                                          label="author"
                                          name='autor'
                                          className="form-control search-slt"
                                          placeholder="Unesite autora"
                                          value={authors}
                                          onChange={(e) => setAuthors(e.target.value)} />

                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <input
                                          type="text"
                                          label="title"
                                          name="author"
                                          className="form-control search-slt"
                                          placeholder="Unesite naziv knjige"
                                          value={title}
                                          onChange={(e) => setTitle(e.target.value)} />
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <input
                                          type="text"
                                          label="category"
                                          name="category"
                                          className="form-control search-slt"
                                          placeholder="Unesite kategoriju"
                                          value={category}
                                          onChange={(e) => setCategory(e.target.value)} />
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <button type="submit"
                                          className="btn btn-danger wrn-btn"> Search books
                                        </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </section>
      </div><div> Ovde ide prikaz knjiga </div>
      <div className="w3-container w3-red">
            <p>{error}</p>
          </div> 
      <div>
    {books_s.map((book, index) => {
      return (
        <div key={index}>
          <h1> Title : {book.title} </h1>
          <p> Number of pages : {book.numberOfPages}</p>
          <p> Authors : {book.authors}</p>
          <p> Description: {book.description}</p>
          <img src = {book.picturePath} /> 
          {/* <button onClick={() => LoanBook(book.title)}>
        Click me
      </button> */}
          <hr />
        </div>
      );
    })}

    <hr />
    <hr />
    <hr />
  </div>
      </>
  )
}

export default SearchBook;
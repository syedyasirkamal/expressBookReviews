const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username=req.body.username;
  const password=req.body.password;

  if(username && password){
    if(!isValid(username)){
      users.push({"username":username,"password":password});
      return res.status(200).json({
        message:"User Added Successfully Now you can log in"
      });
    }
    else{
      return res.status(404).json({message:"User already exists"})
    }
  }
  res.status(404).json({message:"Unable to register User"});

  
});


// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,5))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
   let isbn = req.params.isbn;
   let book = books[isbn]
   res.send(JSON.stringify(book,null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  let author = req.params.author
  let result = {
      "booksByAuthor": []
  }
  let keys = Object.keys(books)
  for(let key of keys) {
      let book = books[key]
      if(book.author == author) {
          result['booksByAuthor'].push(book)
      }
  }

  res.send(result)
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  let title = req.params.title
  let result = {
    "booksByTitle": []
}
  let keys = Object.keys(books)
  for(let key of keys) {
      let book = books[key]
      if(book.title == title) {
          result['booksByTitle'].push(book)
      }
  }

  res.send(result)
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  let isbn = req.params.isbn
  let review = books[isbn].reviews
console.log(review)
  res.send(JSON.stringify(review,null,5));
});

module.exports.general = public_users;
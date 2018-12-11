const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

router.get('/', (req, res, next) => {
   Book.findAll({order: [["title", "ASC"]]}).then((books) => {
       res.render("index", {books: books});
   }).catch((error) => {
      res.send(500, error);
   });
  })

  router.get('/new', (req, res, next) => {
     res.render("newBook", {title: "New Book"});
  })

  /* POST create book. */
  router.post('/new', function(req, res, next) {
    Book.create(req.body).then(function(books) {
      res.redirect("/books/");
   }).catch((error) => {
      if(error.name === "SequelizeValidationError") {
        res.render("newBook", {
           books: Book.build(req.body),
           title: "New Book",
           errors: error.errors,
        })
      } else {
        throw error;
      }
   }).catch((error) => {
      res.send(500, error);
    });
  });


router.get('/:id', (req, res, next) => {
   Book.findById(req.params.id).then( (books) => {
     if(books) {
       res.render("updateBook", {books: books, title: "Edit Book"});
     } else {
       res.send(404);
     }
  }).catch((error) => {
       res.send(500, error);
    });
 });

 /* PUT update article. */
 router.post("/:id", (req, res, next) => {
   Book.findById(req.params.id).then((books) => {
     if (books) {
       return books.update(req.body);
     } else {
       res.send(404);
     }
  }).then((books) => {
     res.redirect("/books/");
   }).catch((error) => {
      if(error.name === "SequelizeValidationError") {
         const book = Book.build(req.body);
         book.id = req.params.id;
         res.render("updateBook", {
            books: book,
            title: "Edit Book",
            errors: error.errors,
        })
      } else {
        throw error;
      }
   }).catch((error) => {
      res.send(500, error);
    });
 });

/* DELETE a book from database. */

 router.post('/:id/delete', (req, res, next) => {
   Book.findById(req.params.id).then( (books) => {
      if(books) {
        return books.destroy();
      } else {
        res.send(404);
      }
   }).then((books) => {
      res.redirect("/books/");
   }).catch((error) => {
        res.send(500, error);
     });
  });


module.exports = router;

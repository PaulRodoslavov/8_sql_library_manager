const express = require("express");
const bodyParser = require('body-parser');

const app = express();

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


   // Set up pug
app.set("view engine", "pug");

   // Routers
app.use("/static", express.static('public'));
const mainRoutes = require('./routes')
const booksRoutes = require('./routes/books')

app.use(mainRoutes);
app.use("/books", booksRoutes);

   //Error handling
app.use((req, res, next) => {
   const err = new Error("Not Found");
   err.status = 404;
   next(err);
});

   //Error handling
app.use((err, req, res, next) => {
   res.render("Error")
});



module.exports = app;

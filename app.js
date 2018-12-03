const express = require("express");
const app = express();

   // Set up pug
app.set("view engine", "pug");

   // Routers
app.use("/static", express.static('public'));
const mainRoutes = require('./routes')
app.use(mainRoutes);







app.listen("3000", () => {
   console.log('The application is running on localhost:3000!')
})

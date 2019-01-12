const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const body_parser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Body Pareser Config
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo DB
mongoose
  .connect(db)
  .then(result => {
    console.log("Mongo DB Connected");
  })
  .catch(err => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", posts);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});

// module.exports.app = app;

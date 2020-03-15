const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express()

const Post = require('./models/post');
const port = 3000

mongoose
  .connect(
    "mongodb+srv://taylor:lily341022@cluster0-dz0py.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/books", (req, res, next) => {
  const post = new Post ({
    title: req.body.title,
    price: req.body.price,
    author: req.body.author
  })
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
})

app.get("/api/books", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "successfully",
      books : documents
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
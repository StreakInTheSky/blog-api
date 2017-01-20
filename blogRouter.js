"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./model');

let router = express();

router.use(jsonParser);

BlogPosts.create('Hello', 'Hello World', 'Ross');
BlogPosts.create('Day 1', 'My day was great', 'Ross');

router.get("/", (req, res) => {
  res.json(BlogPosts.get());
})

router.post("/", (req, res) => {
  const requiredFields = ['title', 'content', 'author']
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body.`
      console.error(message)
      return res.status(400).send(message);
    }
  })
  const blogPost = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  return res.status(200).json(BlogPosts.create(req.body.title, req.body.content, req.body.author));
})

router.delete('/', (req, res) => {
  const requiredFields = ['id'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body.`
      console.error(message);
      return res.status(400).send(message);
    }
  });

  BlogPosts.delete(req.body.id);
  console.log(`Deleted blog post ${req.body.ID}`);
  res.status(204).end();
})

router.put('/', jsonParser, (req, res) => {
  const requiredFields = ['id'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body.`
      console.error(message);
      return res.status(400).send(message);
    }
  });

  console.log(`Updating blog post ${req.body.id}`);
  res.status(200).json( BlogPosts.update(req.body));
});

module.exports = router;
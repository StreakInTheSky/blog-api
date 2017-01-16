"use strict";

const express = require('express');

const app = express();

const blogRouter = require('./blogRouter');

// log the http layer
app.use(morgan('common'));


// when requests come into `/shopping-list` or
// `/recipes`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/', blogRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
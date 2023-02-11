'use strict';

const Book = require('../models/book');

function getBooks(req, res, next){
  let queryObject = {};
  Book.find(queryObject)
  .then(data => res.status(200).send(data))
  .catch(err => next(err));
}

module.exports = getBooks;

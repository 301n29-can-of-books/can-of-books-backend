'use strict';

const Book = require('../models/book');

const bookHandler = {};

bookHandler.getBooks = function (req, res, next) {
  let queryObject = {email: req.user.email};
  Book.find(queryObject)
    .then(data => res.status(200).send(data))
    .catch(err => next(err));
}

bookHandler.postBooks = function (req, res, next) {
  const data = {...req.body, email: req.user.email};
  Book.create(data)
    .then(createdBook => res.status(200).send(createdBook))
    .catch(err => next(err));
}

bookHandler.deleteBooks = function (req, res, next) {
  const id = req.params.id;
  const userEmail = req.user.email;
  Book.findById(id)
    .then(book => {
      if (book.email !== userEmail) {
        res.status(403).send('Not Authorized');
      }
      else {
        Book.deleteOne({_id: book._id})
        .then(deletedBook => {
          if (deletedBook == null) {
            res.status(404).send('Cannot find book.');
          }
          else {
            res.status(200).send(`Deleted book ${deletedBook}`);
          }
        });
      }
    })
    .catch(err => next(err));
}

bookHandler.putBooks = function (req, res, next) {
  const id = req.params.id;
  //grabbing json data from request body
  const data = req.body;
  //new - return 
  const userEmail = req.user.email;
  Book.findById(id)
    .then(book => {
      if (book.email !== userEmail) {
        res.status(403).send('Not Authorized');
      }
      else {
        Book.updateOne({_id: book._id}, data, {new: true})
        .then(updatedBook => {
          if (updatedBook == null) {
            res.status(404).send('Cannot find book.');
          }
          else {
            res.status(200).send(`Updated book ${updatedBook}`);
          }
        });
      }
    })
    .catch(err => next(err));
}

module.exports = bookHandler;

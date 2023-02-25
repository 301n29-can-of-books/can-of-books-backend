'use strict';

const mongoose = require('mongoose');

// deconstructing schema out of mongoose
const {Schema} = mongoose;

// Creating schema layout
const bookSchema = new Schema({
  title: String,
  description: String,
  status: String,
  email: String,
});

// Exporting model
module.exports = mongoose.model('Book', bookSchema);

'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

// starting mongoDB connection to atlas
mongoose.connect(process.env.MONGODB_URL);

// bringing in model
const Book = require('./models/book');

// function seeds data into the database
async function seed() {
  const bookOne = new Book({
    title: 'East of Eden',
    description: `Set in the rich farmland of California's Salinas Valley, this sprawling and often brutal novel follows the intertwined destinies of two families—the Trasks and the Hamiltons—whose generations helplessly reenact the fall of Adam and Eve and the poisonous rivalry of Cain and Abel.`,
    status: 'Complete'
  });

  await bookOne.save()
    .then(response => console.log('Saved East of Eden to database'))
    .catch(err => next(err));

  const bookTwo = new Book({
    title: 'Bad Blood',
    description: `The gripping story of Elizabeth Holmes and Theranos—one of the biggest corporate frauds in history—a tale of ambition and hubris set amid the bold promises of Silicon Valley, rigorously reported by the prize-winning journalist.`,
    status: 'Complete'
  });

  await bookTwo.save()
  .then(response => console.log('Saved Bad Blood to database'))
  .catch(err => next(err));

  const bookThree = new Book({
    title: 'Deserter',
    description: `A vengeful family hides an army deserter for eight years after the end of World War II, cocooning him in a false reality where the war never ended. A pair of girls look alike, but they’re not twins. And a boy’s nightmare threatens to spill out into the real world…`,
    status: 'incomplete'
  })

  await bookThree.save()
  .then(response => console.log('Saved Deserter to database'))
  .catch(err => next(err));

  // disconnecting from the database
  mongoose.disconnect();
}

// run the file with (node seed.js)
seed();

'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookHandler = require('./modules/bookHandler')

const app = express();
app.use(cors());

// required for req.body. without this body will not render/show undefined
app.use(express.json()); 

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;


// listening for errors in case something goes wrong
db.on('error', console.error.bind(console, 'connection error'));

// runs on open when the console log is connected
db.once('open', () => console.log('Mongoose is connected'))

app.get('/test', (request, response) => {

  response.send('test request received')

})

// route for running getBooks function
app.get('/books', bookHandler.getBooks);

// route for posting a new book in our database
app.post('/books', bookHandler.postBooks);

// route to delete a book by its id
app.delete('/books/:id', bookHandler.deleteBooks);


app.listen(PORT, () => console.log(`listening on ${PORT}`));

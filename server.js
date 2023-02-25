'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./authorize');
const bookHandler = require('./modules/bookHandler')

const app = express();
app.use(cors());

// required for req.body. without this body will not render/show undefined
app.use(express.json()); 

app.use(verifyUser);

const PORT = process.env.PORT || 3002;

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
app.get('/books', bookHandler.getBooks); //this is the route that is handling the get /books end point

// route for posting a new book in our database
app.post('/books', bookHandler.postBooks);

// route to delete a book by its id
app.delete('/books/:id', bookHandler.deleteBooks);

// route to update a book by its id
app.put('/books/:id', bookHandler.putBooks);


app.listen(PORT, () => console.log(`listening on ${PORT}`));

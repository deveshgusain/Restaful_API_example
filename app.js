const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
if (process.env.ENV === 'Test') {
  console.log('This is test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}
// const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Hello....');
});

app.server = app.listen(port, () => {
  console.log(`listening in port ${port}`);
});

module.exports = app;

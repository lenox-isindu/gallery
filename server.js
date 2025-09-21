const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./_config');   
const env = process.env.NODE_ENV || 'development';
const mongoURI = config.mongoURI[env];

let index = require('./routes/index');
let image = require('./routes/image');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to MongoDB Atlas (${env})`))
  .catch(err => console.error('MongoDB connection error:', err));


const app = express();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', index);
app.use('/image', image);

// Server listen only if not in test mode
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
  });
}

module.exports = app;

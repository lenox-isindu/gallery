const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Load config
const config = require('./_config');   // make sure the filename matches
const env = process.env.NODE_ENV || 'development';
const mongoURI = config.mongoURI[env];

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// connecting the database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Connected to MongoDB Atlas (${env})`))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Initializing the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json());

app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

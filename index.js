require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/dbConn')
require('express-async-errors');
const corsOptions = require('./config/corsOptions')

const app = express()

connectDB()

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/public'))) // serve static files
app.use('/', require('./routes/root')) // serve root routes
app.use('/posts', require('./routes/postRoutes')) // serve post routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '/views/404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not found' })
  } else {
    res.type('txt').send('404 Not found')
  }
})

app.listen(3005, () => console.log('Listening on port 3005...'));
const mongoose = require('mongoose');

const connectDB = async () => mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Could not connec to MongoDB Atlas: ', err.message))

module.exports = connectDB;
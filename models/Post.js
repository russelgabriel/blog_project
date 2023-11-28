const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: 3
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
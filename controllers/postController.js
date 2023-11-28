const Post = require('../models/Post');
const asyncHandler = require('express-async-handler')

// @desc    Get all posts
// @route   GET /posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().lean() // lean() returns a plain JS object instead of a Mongoose document
  if (!posts?.length) {
    return res.status(404).json({ message: 'No posts found' })
  }

  res.json(posts)
})

// @desc    Create a new post
// @route   POST /posts
// @access  Private
const createNewPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' })
  }

  const newPost = await Post.create({ title, content })

  if (newPost) {
    return res.status(201).json({ message: `Post "${title}" created successfully` })
  }
  return res.status(500).json({ message: 'Something went wrong' })
})

// @desc    Update a post
// @route   PATCH /posts
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const { id, title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' })
  }

  const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true })

  if (updatedPost) {
    return res.status(201).json({ message: `Post "${title}" updated successfully` })
  }
  return res.status(500).json({ message: 'Something went wrong' })
})

// @desc    Delete a post
// @route   DELETE /posts
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'ID is required' })
  }

  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  const result = await post.deleteOne()

  const reply = `Post ${post.title} with ID ${post._id} deleted successfully`

  res.json(reply)
})

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost
}
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Post = require('../models/Post');
const User = require('../models/User');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Populate author field, selecting only the name
    const posts = await Post.find().populate('author', 'name').sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Populate author field, selecting only the name
    const post = await Post.findById(req.params.id).populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const newPost = new Post({
      title,
      content,
      author: req.user.id
    });
    
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check if user owns the post
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Update post
    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check if user owns the post
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 
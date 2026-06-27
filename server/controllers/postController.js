const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.create({
      user: req.body.userId,
      content
    });

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Posts
const getPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      posts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createPost,
  getPosts
};
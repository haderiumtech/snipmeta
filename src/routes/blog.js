const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

/**
 * GET /blog - Get all blog posts
 */
router.get('/blog', blogController.getAllPosts);

/**
 * GET /blog/search?q=keyword - Search blog posts
 */
router.get('/blog/search', blogController.searchPosts);

/**
 * GET /blog/category/:category - Get posts by category
 */
router.get('/blog/category/:category', blogController.getCategory);

/**
 * GET /blog/:slug - Get single blog post
 */
router.get('/blog/:slug', blogController.getPost);

module.exports = router;

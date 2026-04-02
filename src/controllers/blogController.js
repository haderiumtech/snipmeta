const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOGS_DIR = path.join(__dirname, '../../public/blogs');

// Lazy load marked to handle ES module
let marked = null;
const getMarked = async () => {
  if (!marked) {
    marked = (await import('marked')).marked;
  }
  return marked;
};

/**
 * Get all blog posts
 */
const getAllPosts = async (req, res) => {
  try {
    const files = fs.readdirSync(BLOGS_DIR);
    const posts = [];

    files.forEach(file => {
      const filePath = path.join(BLOGS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, excerpt } = matter(content);

      posts.push({
        slug: file.replace('.md', ''),
        title: data.title,
        description: data.description,
        author: data.author || 'InstaTube Team',
        date: data.date,
        category: data.category,
        featured: data.featured || false,
        image: data.image,
        readTime: calculateReadTime(content)
      });
    });

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    console.error('Blog error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch blog posts'
    });
  }
};

/**
 * Get single blog post
 */
const getPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(BLOGS_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const markedLib = await getMarked();
    const html = markedLib.parse(content);

    // Get related posts
    const allFiles = fs.readdirSync(BLOGS_DIR);
    const relatedPosts = [];

    allFiles.slice(0, 3).forEach(file => {
      if (file !== `${slug}.md`) {
        const postContent = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf-8');
        const postData = matter(postContent).data;
        relatedPosts.push({
          slug: file.replace('.md', ''),
          title: postData.title,
          image: postData.image
        });
      }
    });

    return res.status(200).json({
      success: true,
      post: {
        slug,
        title: data.title,
        description: data.description,
        author: data.author || 'InstaTube Team',
        date: data.date,
        category: data.category,
        image: data.image,
        content: html,
        readTime: calculateReadTime(content),
        keywords: data.keywords || [],
        related: relatedPosts
      }
    });
  } catch (error) {
    console.error('Blog error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch blog post'
    });
  }
};

/**
 * Search blog posts
 */
const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Search query must be at least 2 characters'
      });
    }

    const files = fs.readdirSync(BLOGS_DIR);
    const results = [];
    const searchTerm = q.toLowerCase();

    files.forEach(file => {
      const filePath = path.join(BLOGS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      const titleMatch = data.title?.toLowerCase().includes(searchTerm);
      const descMatch = data.description?.toLowerCase().includes(searchTerm);
      const categoryMatch = data.category?.toLowerCase().includes(searchTerm);

      if (titleMatch || descMatch || categoryMatch) {
        results.push({
          slug: file.replace('.md', ''),
          title: data.title,
          description: data.description,
          category: data.category,
          image: data.image
        });
      }
    });

    return res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
};

/**
 * Get posts by category
 */
const getCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const files = fs.readdirSync(BLOGS_DIR);
    const posts = [];

    files.forEach(file => {
      const filePath = path.join(BLOGS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      if (data.category?.toLowerCase() === category.toLowerCase()) {
        posts.push({
          slug: file.replace('.md', ''),
          title: data.title,
          description: data.description,
          author: data.author || 'InstaTube Team',
          date: data.date,
          category: data.category,
          image: data.image,
          readTime: calculateReadTime(content)
        });
      }
    });

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.status(200).json({
      success: true,
      category,
      posts
    });
  } catch (error) {
    console.error('Category error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch category'
    });
  }
};

/**
 * Helper: Calculate read time
 */
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

module.exports = {
  getAllPosts,
  getPost,
  searchPosts,
  getCategory
};

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const blogRoutes = require('./routes/blog');
const rateLimiterMiddleware = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : '*',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Request logging middleware (basic)
app.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

// Rate limiter
app.use(rateLimiterMiddleware);

// API routes
app.use('/api', apiRoutes);

// Blog API routes
app.use('/api', blogRoutes);

// Serve home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve pages
app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/privacy-policy.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/terms-of-service.html'));
});

app.get('/how-to-use', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/how-to-use.html'));
});

// Blog pages
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/blog.html'));
});

app.get('/blog-post', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/blog-post.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: NODE_ENV === 'production' 
      ? 'An error occurred' 
      : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
});

module.exports = app;

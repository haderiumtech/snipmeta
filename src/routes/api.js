const express = require('express');
const router = express.Router();
const { handleDownload, getMetadata } = require('../controllers/downloadController');

/**
 * POST /api/download
 * Downloads video from Instagram or Threads
 */
router.post('/download', handleDownload);

/**
 * POST /api/metadata
 * Gets metadata for video without downloading
 */
router.post('/metadata', getMetadata);

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;

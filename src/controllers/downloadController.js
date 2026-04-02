const { downloadVideo } = require('../utils/downloader');
const { validateURL, sanitizeInput } = require('../middleware/inputValidator');

/**
 * Handle video download request
 * POST /api/download
 */
const handleDownload = async (req, res) => {
  try {
    const { url } = req.body;

    // Input validation
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Sanitize input
    const sanitized = sanitizeInput(url);

    // Validate URL format
    const validation = validateURL(sanitized);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }

    // Send processing response while fetching
    const result = await downloadVideo(validation.url);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Download controller error:', error.message);

    const statusCode = error.message.includes('Invalid') ? 400 : 502;
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'Failed to process video'
    });
  }
};

/**
 * Get video metadata without download
 * POST /api/metadata
 */
const getMetadata = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    const sanitized = sanitizeInput(url);
    const validation = validateURL(sanitized);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }

    // For metadata, we just validate and return
    return res.status(200).json({
      success: true,
      message: 'URL is valid. Proceeding with download...'
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  handleDownload,
  getMetadata
};

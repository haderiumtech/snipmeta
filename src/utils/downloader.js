const axios = require('axios');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

/**
 * Downloads Instagram/Threads video metadata using yt-dlp
 * Note: yt-dlp is the most reliable open-source method
 * Alternative: In production, consider using an Instagram API service
 */
const downloadVideo = async (url) => {
  try {
    // Validate URL format
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL');
    }

    // Check if it's a Threads video (currently not supported by yt-dlp)
    if (url.includes('threads.net') || url.includes('threads.com')) {
      throw new Error('Threads video support is limited. Please try downloading Instagram, Twitter, or Facebook videos instead. Threads videos can be downloaded using screen recording or mobile apps.');
    }

    // This uses yt-dlp which must be installed on the server
    // Supports: Instagram, Twitter/X, Facebook, and many other platforms
    const ytDlpPath = process.env.YT_DLP_PATH || 'yt-dlp';
    const { stdout } = await execAsync(
      `"${ytDlpPath}" -j --no-warnings "${url}"`,
      { timeout: parseInt(process.env.API_TIMEOUT) || 30000 }
    );

    const data = JSON.parse(stdout);

    return {
      success: true,
      video_url: data.url || data.formats?.[0]?.url,
      thumbnail: data.thumbnail,
      title: data.title || 'Video',
      duration: data.duration || 0,
      ext: data.ext || 'mp4'
    };
  } catch (error) {
    console.error('Video download error:', error.message);

    // Return user-friendly error message
    if (error.message.includes('Threads')) {
      throw new Error(error.message);
    }
    if (error.message.includes('yt-dlp')) {
      throw new Error('Video extraction failed. Please ensure yt-dlp is installed.');
    }
    if (error.message.includes('timeout')) {
      throw new Error('Request timeout. Video may be too large or URL may be invalid.');
    }
    if (error.message.includes('Unsupported')) {
      throw new Error('This URL format is not supported. Supported platforms: Instagram, Reels, Twitter, Facebook');
    }

    throw new Error('Failed to fetch video. Please check the URL and try again.');
  }
};

/**
 * Alternative method using instagrapi (requires Python)
 * This is more lightweight but requires different setup
 */
const downloadVideoAlternative = async (url) => {
  try {
    // This is an alternative that could be used instead of yt-dlp
    // It requires: pip install instagrapi
    const { stdout } = await execAsync(
      `python -m instagrapi download "${url}"`,
      { timeout: parseInt(process.env.API_TIMEOUT) || 30000 }
    );

    return {
      success: true,
      data: JSON.parse(stdout)
    };
  } catch (error) {
    throw new Error('Alternative download method failed: ' + error.message);
  }
};

module.exports = {
  downloadVideo,
  downloadVideoAlternative
};

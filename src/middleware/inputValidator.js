const validateURL = (url) => {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  // Trim and normalize URL
  url = url.trim();

  // Check if it's a supported platform URL
  const instagramPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv|stories)\/[\w-]+\/?(\?.*)?$/i;
  const threadsPattern = /^(https?:\/\/)?(www\.)?threads\.(net|com)\/@[\w.]+\/post\/[\w]+\/?(\?.*)?$/i;
  const shortInstagramPattern = /^(https?:\/\/)?(www\.)?ig\.me\/[\w]+\/?(\?.*)?$/i;
  const twitterPattern = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+\/?(\?.*)?$/i;
  // Facebook: supports video.php, watch, share/r, reel, videos URLs
  const facebookPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/.*?(watch|video|share|reel)/i;

  if (!instagramPattern.test(url) && !threadsPattern.test(url) && !shortInstagramPattern.test(url) && 
      !twitterPattern.test(url) && !facebookPattern.test(url)) {
    return { 
      valid: false, 
      error: 'Please enter a valid Instagram, Threads, Twitter, or Facebook URL' 
    };
  }

  return { valid: true, url };
};

const sanitizeInput = (input) => {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 500); // Limit length
};

module.exports = {
  validateURL,
  sanitizeInput
};

# 🎬 InstaTube - Instagram & Threads Video Downloader

A production-ready, high-performance web application for downloading videos from Instagram and Threads. Built with HTML5, CSS3, Vanilla JavaScript, and Node.js/Express.

## 🌟 Features

✅ **Fast & Lightweight** - Optimized for 90+ Lighthouse score  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **Dark/Light Mode** - Theme toggle for user preference  
✅ **No Watermarks** - Clean video downloads  
✅ **SEO Optimized** - Complete meta tags and schema markup  
✅ **Secure** - Input validation, rate limiting, and sanitization  
✅ **Free & Easy** - No registration required  
✅ **Legal Pages** - Privacy Policy, Terms of Service included  

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- `yt-dlp` installed on server (for video extraction)
- A modern web browser

### Install yt-dlp

**Windows:**
```bash
pip install yt-dlp
```

**macOS:**
```bash
brew install yt-dlp
```

**Linux:**
```bash
sudo apt-get install yt-dlp
```

Or install from: https://github.com/yt-dlp/yt-dlp

## 🚀 Installation & Setup

### 1. Clone or Extract Project
```bash
cd e:\Ali\ Hammad\ Hassan\CalculatorWebsite
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env` and adjust settings:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=30
API_TIMEOUT=30000
```

### 4. Run Development Server
```bash
npm run dev
```

Or for production:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
CalculatorWebsite/
├── public/
│   ├── index.html              # Main page
│   ├── css/
│   │   └── style.css           # Global styles
│   ├── js/
│   │   └── script.js           # Client-side JavaScript
│   ├── pages/
│   │   ├── how-to-use.html     # Instructions page
│   │   ├── privacy-policy.html # Privacy policy
│   │   └── terms-of-service.html # Terms
│   └── images/
│       └── (place images here)
├── src/
│   ├── server.js               # Express server setup
│   ├── routes/
│   │   └── api.js              # API endpoints
│   ├── controllers/
│   │   └── downloadController.js # Business logic
│   ├── middleware/
│   │   ├── rateLimiter.js      # Rate limiting
│   │   └── inputValidator.js   # Input validation
│   └── utils/
│       └── downloader.js       # Video download logic
├── package.json
├── .env
├── .env.example
├── .gitignore
└── README.md
```

## 🔧 API Endpoints

### POST /api/download
Download a video from Instagram or Threads

**Request:**
```json
{
  "url": "https://www.instagram.com/p/ABC123DEF/"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "video_url": "https://...",
    "thumbnail": "https://...",
    "title": "Video Title",
    "duration": 30,
    "ext": "mp4"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid URL or video not found"
}
```

### POST /api/metadata
Validate URL without downloading

**Request:**
```json
{
  "url": "https://www.instagram.com/p/ABC123DEF/"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🎨 Customization

### Change Brand Name
1. Edit `public/index.html` - Replace "InstaTube" with your name
2. Edit `public/pages/*.html` - Update all references
3. Update `src/server.js` - Change service descriptions

### Update Colors
Edit `public/css/style.css` - Modify CSS variables:
```css
:root {
    --primary: #6366f1;      /* Change main color */
    --secondary: #ec4899;    /* Change accent color */
    /* ... other colors ... */
}
```

### Add Logo
1. Place your logo in `public/images/`
2. Replace the SVG logo in HTML files with:
```html
<img src="/images/logo.png" alt="Logo" class="logo-icon">
```

## 🔐 Security Features

- **Input Validation**: Validates Instagram/Threads URLs
- **Rate Limiting**: Limits 30 requests per 15 minutes per IP
- **CORS Protection**: Configurable cross-origin settings
- **Helmet.js**: Security headers (CSP, XSS protection, etc.)
- **Input Sanitization**: Prevents injection attacks
- **HTTPS Ready**: Configured for SSL/TLS

## ⚡ Performance Optimization

- **Minified Assets**: CSS and JS are optimized
- **Lazy Loading**: Images load on demand
- **Caching Headers**: Browser caching configured
- **Compression**: gzip compression enabled
- **CDN Ready**: Can use external CDN for assets

**Expected Lighthouse Scores:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Android Chrome)

## 🚀 Deployment

### Option 1: cPanel Hosting (Recommended)

#### Step 1: Prepare Files
```bash
npm install --production
# Create production build
mkdir deploy
cp -r public deploy/
cp -r src deploy/
cp package.json deploy/
cp .env deploy/
```

#### Step 2: Upload to cPanel
1. Connect via File Manager or FTP
2. Upload `deploy/` folder to `public_html/` or subdomain
3. Create Node.js app in cPanel

#### Step 3: Configure in cPanel
1. Go to "Setup Node.js App"
2. Create new app:
   - **Node.js version**: 18.x or higher
   - **Application root**: `/home/username/public_html/deploy`
   - **Application URL**: `yourdomain.com`
   - **Application startup file**: `src/server.js`
3. Click "Create"
4. The app will automatically start

#### Step 4: Install Dependencies
In Node.js App Terminal:
```bash
cd /home/username/public_html/deploy
npm install
```

#### Step 5: Configure Environment
Edit `.env` in cPanel File Manager:
```
PORT=3000
NODE_ENV=production
```

#### Step 6: Enable HTTPS
1. If not already done, install SSL certificate (free with AutoSSL)
2. Configure redirect HTTP to HTTPS in `.htaccess`

### Option 2: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
```

Build and run:
```bash
docker build -t instatube .
docker run -p 3000:3000 instatube
```

### Option 3: VPS/Cloud (AWS, DigitalOcean, Linode)

```bash
# SSH into server
ssh user@your-server

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm

# Clone project
git clone your-repo-url
cd your-project

# Install dependencies
npm install

# Install yt-dlp
sudo apt-get install yt-dlp

# Use PM2 for process management
sudo npm install -g pm2
pm2 start src/server.js --name "instatube"
pm2 startup
pm2 save

# Configure Nginx reverse proxy
sudo apt-get install nginx
```

Configure Nginx (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

## 🛠 Troubleshooting

### Video Download Fails
- Ensure `yt-dlp` is installed: `yt-dlp --version`
- Check if video is public
- Verify URL is correct
- Check server logs for errors

### Rate Limiting Issues
- Adjust `RATE_LIMIT_MAX_REQUESTS` in `.env`
- Clear browser cache and cookies

### CORS Errors
- Update `src/server.js` - Modify CORS origin if needed
- Check browser console for specific errors

### High Memory Usage
- Reduce `RATE_LIMIT_MAX_REQUESTS`
- Implement video size limits
- Use caching strategies

## 📊 Monitoring

Check server health:
```bash
curl http://localhost:3000/api/health
```

View logs:
```bash
# Development
npm run dev

# Production (PM2)
pm2 logs instatube
```

## 📈 SEO Optimization

The site includes:
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (social sharing)
- ✅ Schema.org structured data
- ✅ Proper heading hierarchy
- ✅ XML sitemap compatible
- ✅ Mobile-friendly design
- ✅ Fast load times

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## ⚖️ Legal Disclaimer

- This tool is provided for **personal use only**
- Users are responsible for ensuring they have rights to download content
- Not affiliated with Instagram or Meta
- Respect intellectual property and copyright laws
- We are not liable for misuse of this application

## 📞 Support

For issues, questions, or feature requests:
- Email: support@yourdomain.com
- GitHub Issues: (if applicable)
- Documentation: See `/public/pages/how-to-use.html`

## 🎉 Changelog

### v1.0.0 (December 2024)
- Initial release
- Instagram video downloader
- Threads video downloader
- Dark/Light mode
- Mobile responsive design
- Rate limiting
- Security headers
- Legal pages

---

**Built with ❤️ for the web. Made fast. Made simple.**

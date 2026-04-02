# 🚀 Quick Start Guide

Get SNIPMETA running locally in 5 minutes!

## Prerequisites

- Node.js v14+ ([download](https://nodejs.org/))
- npm (comes with Node.js)
- yt-dlp installed ([install](https://github.com/yt-dlp/yt-dlp))

## Installation

### 1. Install Dependencies
```bash
cd e:\Ali\ Hammad\ Hassan\CalculatorWebsite
npm install
```

### 2. Configure Environment
```bash
# Copy example env
cp .env.example .env

# Edit .env if needed (defaults are fine for development)
```

### 3. Start Development Server
```bash
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3000
📝 Environment: development
```

### 4. Open in Browser
```
http://localhost:3000
```

## Testing Features

### Test Dark/Light Mode
- Click the sun/moon icon in top right
- Should toggle between light and dark modes
- Theme preference is saved to localStorage

### Test Video Download
1. Go to Instagram or Threads
2. Copy a video URL (e.g., https://www.instagram.com/p/ABC123/)
3. Paste into the input field
4. Click "Download"
5. Wait for video to process (~5-10 seconds)
6. Click "Download MP4" to save

### Test Mobile Responsiveness
- Open developer tools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on different screen sizes
- All buttons and forms should be responsive

### Test Navigation
- Click logo to go home
- Click "How to Use" link
- Click "Privacy" link
- Test footer links

## Project Structure

```
public/
  ├── index.html          ← Main page
  ├── css/style.css       ← All styles
  ├── js/script.js        ← Client-side logic
  └── pages/              ← Legal pages

src/
  ├── server.js           ← Express app
  ├── routes/api.js       ← API endpoints
  ├── controllers/        ← Business logic
  ├── middleware/         ← Validation, rate limiting
  └── utils/              ← Helper functions
```

## API Testing

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```

Response:
```json
{"status":"ok","timestamp":"2024-01-01T12:00:00.000Z"}
```

### Test Download Endpoint
```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/p/ABC123/"}'
```

## Common Issues

### Error: `command not found: npm`
- Install Node.js from https://nodejs.org/

### Error: `yt-dlp not found`
- Install yt-dlp:
  ```bash
  pip install yt-dlp
  ```

### Error: `Port 3000 already in use`
- Kill the process on port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:3000 | xargs kill -9
  ```

### Video Download Fails
- Check URL is valid Instagram/Threads video
- Ensure video is public
- Check internet connection
- Try a different video

### Dark Mode Not Working
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for JavaScript errors (F12)
- Try a different browser

## Customization

### Change Brand Name
Edit `public/index.html`:
```html
<!-- Find: -->
<a href="/">
    <svg class="logo-icon" ...></svg>
    InstaTube  ← Change this
</a>
```

### Change Colors
Edit `public/css/style.css`:
```css
:root {
    --primary: #6366f1;   ← Change primary color
    --secondary: #ec4899; ← Change secondary color
}
```

### Add Logo
1. Replace SVG in HTML with:
```html
<img src="/images/logo.png" alt="Logo" class="logo-icon">
```

2. Place image in `public/images/`

### Update Contact Email
Find and replace all instances of:
```
support@yourdomain.com
yourdomain.com
```

## Production Build

### Optimize for Production
```bash
# Install only production dependencies
npm install --production

# Set environment
NODE_ENV=production npm start
```

### Deploy to Hosting
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Performance Tips

### Measure Performance
```bash
# Install lighthouse
npm install -g lighthouse

# Test website
lighthouse http://localhost:3000 --view
```

### Optimize Images
- Use WebP format
- Compress PNG/JPG files
- Lazy load below-the-fold images

### Minimize CSS/JS
- Already minified in production
- Use `npm run build` if bundler added

## Debugging

### Enable Verbose Logging
Edit `src/server.js`:
```javascript
if (NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
}
```

### View Browser Console
- Press F12
- Go to "Console" tab
- Watch for errors

### View Server Logs
- Terminal running `npm run dev` shows all logs
- Errors display with full stack trace

## Next Steps

1. ✅ Start development server: `npm run dev`
2. ✅ Test all features locally
3. ✅ Customize brand name and colors
4. ✅ Update legal pages (privacy, terms)
5. 📱 Test on mobile devices
6. 🚀 Deploy to production (see DEPLOYMENT_GUIDE.md)

## Support

- See [README.md](./README.md) for full documentation
- See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment
- See [PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md) for final checks

---

**Happy coding! 🎉**

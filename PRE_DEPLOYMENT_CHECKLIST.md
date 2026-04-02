# Pre-Deployment Checklist

## Before Deploying to Production

### Code & Configuration

- [ ] Update brand name (InstaTube → Your Brand)
  - [ ] public/index.html
  - [ ] public/pages/how-to-use.html
  - [ ] public/pages/privacy-policy.html
  - [ ] public/pages/terms-of-service.html
  - [ ] public/css/style.css (colors, if needed)

- [ ] Update contact information
  - [ ] support@yourdomain.com (replace with actual email)
  - [ ] yourdomain.com (replace with actual domain)

- [ ] Configure environment variables (.env)
  - [ ] Set NODE_ENV=production
  - [ ] Set correct PORT
  - [ ] Adjust RATE_LIMIT settings for expected traffic
  - [ ] Set API_TIMEOUT appropriately

- [ ] Review security settings
  - [ ] Check CORS origin in src/server.js
  - [ ] Verify rate limiting is active
  - [ ] Ensure input validation is working

### Legal & Privacy

- [ ] Customize Privacy Policy
  - [ ] Update [Your Country/State] in privacy policy
  - [ ] Add actual data retention periods
  - [ ] Specify third-party services used

- [ ] Customize Terms of Service
  - [ ] Add your contact information
  - [ ] Update jurisdiction information
  - [ ] Add specific terms for your service

- [ ] Add Disclaimer to home page
  - [ ] Clearly state "Not affiliated with Instagram or Meta"
  - [ ] Mention copyright/DMCA compliance

### Performance & Features

- [ ] Test all features locally
  - [ ] Dark/Light mode toggle - TESTING
  - [ ] Video download functionality - TESTING
  - [ ] Mobile responsiveness - TESTING
  - [ ] All navigation links - TESTING
  - [ ] Error messages - TESTING

- [ ] Optimize assets
  - [ ] Minify CSS (optional - already done)
  - [ ] Minify JavaScript (optional - already done)
  - [ ] Compress images in public/images/
  - [ ] Test page load speed (target: <2s)

- [ ] Test on multiple browsers
  - [ ] Chrome/Edge (desktop)
  - [ ] Firefox (desktop)
  - [ ] Safari (desktop)
  - [ ] Mobile Safari (iOS)
  - [ ] Chrome (Android)

### Server Setup

- [ ] Install Node.js (v14+)
  - [ ] Verify: node --version

- [ ] Install npm dependencies
  - [ ] Run: npm install --production

- [ ] Install yt-dlp
  - [ ] Verify: yt-dlp --version

- [ ] Configure .env for production
  - [ ] NODE_ENV=production
  - [ ] Correct PORT setting
  - [ ] Rate limiting configuration

- [ ] Setup HTTPS/SSL
  - [ ] Get SSL certificate (Let's Encrypt)
  - [ ] Configure on web server
  - [ ] Force HTTPS redirect

### cPanel Specific (if using cPanel)

- [ ] Create Node.js Application
  - [ ] Select Node.js version 18.x or 20.x
  - [ ] Set correct application root
  - [ ] Set correct startup file (src/server.js)

- [ ] Configure domain
  - [ ] Point domain to application
  - [ ] Enable SSL/TLS

- [ ] Upload .htaccess
  - [ ] Configure caching
  - [ ] Setup compression
  - [ ] Configure security headers

- [ ] Setup error logging
  - [ ] Create logs directory
  - [ ] Set correct permissions

### Monitoring & Maintenance

- [ ] Setup monitoring
  - [ ] Configure uptime monitoring
  - [ ] Setup error alerts
  - [ ] Enable logging

- [ ] Create backup strategy
  - [ ] Schedule automatic backups
  - [ ] Test backup restoration
  - [ ] Document backup location

- [ ] Setup version control
  - [ ] Initialize git repository (if needed)
  - [ ] Create .gitignore (already done)
  - [ ] Document changes

### Final Checks

- [ ] Test website in production
  - [ ] Load homepage
  - [ ] Test download functionality
  - [ ] Check mobile responsiveness
  - [ ] Verify all links work

- [ ] Check SEO
  - [ ] Meta tags present
  - [ ] Schema markup included
  - [ ] robots.txt configured
  - [ ] sitemap.xml created (optional)

- [ ] Security audit
  - [ ] Test input validation
  - [ ] Verify rate limiting works
  - [ ] Check HTTPS enforcement
  - [ ] Review security headers

- [ ] Performance audit
  - [ ] Run Lighthouse test
  - [ ] Check page load time
  - [ ] Monitor server resources
  - [ ] Test under load

- [ ] Documentation
  - [ ] Update README.md with your info
  - [ ] Document custom changes
  - [ ] Create deployment notes
  - [ ] Setup support documentation

### Post-Launch

- [ ] Register domain with search engines
  - [ ] Google Search Console
  - [ ] Bing Webmaster Tools
  - [ ] Create sitemap.xml

- [ ] Monitor performance
  - [ ] Watch error logs daily for first week
  - [ ] Monitor server resources
  - [ ] Collect user feedback

- [ ] Plan updates
  - [ ] Security patches
  - [ ] Feature improvements
  - [ ] Performance optimization
  - [ ] Content updates

---

## Quick Deployment Steps

1. Update configuration files (brand name, domain, contact)
2. Test locally: `npm run dev`
3. Install production dependencies: `npm install --production`
4. Upload to server (via FTP, SSH, or cPanel File Manager)
5. Create Node.js app in cPanel
6. Verify application is running
7. Test all features
8. Monitor logs for errors
9. Share and collect feedback

---

**Last Updated:** December 2024
**Current Status:** Ready for Production

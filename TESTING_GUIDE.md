# 🧪 Testing & Verification Guide

Complete testing checklist before launching to production.

## 🟢 Phase 1: Local Development Testing

### 1.1 Environment Setup
```bash
# Verify Node.js installed
node --version          # Should be v14+
npm --version           # Should be v6+

# Verify yt-dlp installed
yt-dlp --version        # Should show version

# Install dependencies
npm install
```

### 1.2 Start Server
```bash
npm run dev
```

Should see:
```
🚀 Server running on http://localhost:3000
📝 Environment: development
```

### 1.3 Test Homepage
- [ ] Page loads (no 404 or 500 errors)
- [ ] All text is readable
- [ ] Images load properly
- [ ] Logo is visible
- [ ] Navigation menu visible
- [ ] Hero section displays correctly
- [ ] Input field is visible and clickable

### 1.4 Test Navigation
- [ ] Logo link goes to home
- [ ] "Home" link works
- [ ] "How to Use" link loads page
- [ ] "Privacy" link loads page
- [ ] All footer links work
- [ ] Links highlight on hover

### 1.5 Test Theme Toggle
- [ ] Sun/moon icon visible
- [ ] Clicking icon toggles theme
- [ ] Dark mode has dark background
- [ ] Light mode has light background
- [ ] Text color changes appropriately
- [ ] Reload page - theme preference saved
- [ ] Works on all pages

### 1.6 Test Responsiveness
Test on these breakpoints:
- [ ] Desktop (1920px) - Everything visible
- [ ] Laptop (1200px) - Responsive layout
- [ ] Tablet (768px) - Hamburger menu works
- [ ] Mobile (375px) - Mobile first design

**Developer Tools Testing:**
```
F12 → Toggle device toolbar (Ctrl+Shift+M)
Test: iPhone SE, iPad, Android
```

---

## 🔴 Phase 2: Feature Testing

### 2.1 Video Download Feature

**Test Case 1: Valid Instagram Post**
```
Setup: Copy URL from Instagram post
Example: https://www.instagram.com/p/ABC123DEF/

Test:
- [ ] URL accepts the link
- [ ] Loading spinner appears
- [ ] Video thumbnail displays
- [ ] Video title shows
- [ ] Download button appears
- [ ] Can click "Download MP4"
- [ ] File downloads to computer
- [ ] Downloaded file is playable
- [ ] File is actually MP4 format
- [ ] No watermark on video
```

**Test Case 2: Valid Instagram Reel**
```
Example: https://www.instagram.com/reel/ABC123DEF/

Test same steps as above
```

**Test Case 3: Valid Threads Video**
```
Example: https://www.threads.net/@username/post/123456789

Test same steps as above
```

**Test Case 4: Invalid URL**
```
Test with:
- Empty URL
- Random text
- Facebook link
- YouTube link
- Incomplete Instagram URL

Expected: Error message appears
```

**Test Case 5: Private Video**
```
Test with link to private Instagram profile

Expected: Error message "Video not found or private"
```

### 2.2 Error Handling

- [ ] Invalid URL → "Invalid URL" message
- [ ] Network error → "Connection failed" message
- [ ] Timeout → "Request timeout" message
- [ ] Video not found → "Video not found" message
- [ ] Deleted video → "Video cannot be accessed" message

### 2.3 Input Validation

- [ ] URL field accepts text input
- [ ] URL field has placeholder text
- [ ] Button is disabled until URL entered
- [ ] Spaces in URL are trimmed
- [ ] Special characters handled
- [ ] Very long URLs rejected

### 2.4 Rate Limiting

```bash
# Test rate limiting
for i in {1..50}; do
  curl -X POST http://localhost:3000/api/download \
    -H "Content-Type: application/json" \
    -d '{"url":"test"}'
done
```

- [ ] First 30 requests succeed
- [ ] Request 31+ shows rate limit error
- [ ] Error message is clear
- [ ] Limit resets after time window

---

## 🟡 Phase 3: Performance Testing

### 3.1 Page Load Speed

```bash
# Install Lighthouse
npm install -g lighthouse

# Run test
lighthouse http://localhost:3000 --view
```

Target Scores:
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 100

### 3.2 Browser DevTools Audit

In Chrome DevTools:
- [ ] Lighthouse report shows 90+ overall
- [ ] No console errors (only warnings acceptable)
- [ ] No console warnings in production
- [ ] Network tab shows reasonable file sizes

### 3.3 Load Time Testing

```bash
curl -w "%{time_total}s\n" -o /dev/null -s http://localhost:3000
```

- First Load: < 500ms
- Subsequent Loads: < 200ms

### 3.4 Asset Size Testing

```bash
# Check file sizes
ls -lh public/css/style.css
ls -lh public/js/script.js
```

Target:
- [ ] CSS: < 50 KB
- [ ] JS: < 20 KB
- [ ] Total: < 100 KB

---

## 🔵 Phase 4: Security Testing

### 4.1 Input Sanitization

Test with potentially malicious input:
```
<script>alert('xss')</script>
'; DROP TABLE users; --
../../../etc/passwd
%27 OR %271%27=%271
```

- [ ] No JavaScript executed
- [ ] No database errors
- [ ] Error message displayed
- [ ] App stays stable

### 4.2 Rate Limiting

```bash
# Rapid fire requests
for i in {1..50}; do curl http://localhost:3000/api/download; done
```

- [ ] After 30 requests: rate limit error
- [ ] Error message is clear
- [ ] App doesn't crash
- [ ] Recovery after time window

### 4.3 API Security

```bash
# Test with curl
curl http://localhost:3000/api/health

# Test with malformed JSON
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d 'invalid json {'
```

- [ ] Valid requests succeed
- [ ] Invalid requests return 400 error
- [ ] No stack traces exposed
- [ ] Helpful error messages

### 4.4 CORS Testing

```bash
# Test cross-origin requests
curl -H "Origin: http://example.com" http://localhost:3000
```

- [ ] Returns appropriate CORS headers
- [ ] Configured for correct domain
- [ ] Blocks unauthorized origins

---

## 🟠 Phase 5: Browser Compatibility Testing

Test on these browsers:

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | 90+ | Latest | [ ] |
| Firefox | 88+ | Latest | [ ] |
| Safari | 14+ | Latest | [ ] |
| Edge | 90+ | - | [ ] |
| Opera | Latest | - | [ ] |

For each browser test:
- [ ] Page loads without errors
- [ ] Layout displays correctly
- [ ] All features work
- [ ] Animations are smooth
- [ ] No console errors

---

## 🟡 Phase 6: API Testing

### 6.1 Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

Response should be:
```json
{
  "status": "ok",
  "timestamp": "2024-12-01T12:00:00.000Z"
}
```

- [ ] Returns 200 status code
- [ ] Has status: "ok"
- [ ] Has valid timestamp

### 6.2 Download API

```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/p/ABC123/"}'
```

- [ ] Returns 200 on success
- [ ] Returns proper error code on failure
- [ ] Includes video_url in response
- [ ] Includes thumbnail in response
- [ ] Includes title in response

### 6.3 Metadata API

```bash
curl -X POST http://localhost:3000/api/metadata \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/p/ABC123/"}'
```

- [ ] Returns 200 on valid URL
- [ ] Returns 400 on invalid URL
- [ ] Response is quick (< 1s)

---

## 🟢 Phase 7: Usability Testing

### 7.1 First-Time User Experience

As a new user:
- [ ] Can understand what the app does
- [ ] Can easily find the input field
- [ ] Can understand how to use it
- [ ] Can download a video without help
- [ ] Can find help/FAQ easily

### 7.2 Mobile UX

On mobile phone:
- [ ] All buttons are touchable (48x48px minimum)
- [ ] Text is readable without zooming
- [ ] Form fields are large enough
- [ ] No horizontal scrolling needed
- [ ] Hero section looks good
- [ ] Download flow is intuitive

### 7.3 Accessibility

Using keyboard only (Tab through site):
- [ ] All interactive elements reachable
- [ ] Focus indicators visible
- [ ] Can submit form with Enter
- [ ] Logical tab order

Using screen reader (NVDA/JAWS):
- [ ] All text is readable
- [ ] Form labels present
- [ ] Images have alt text
- [ ] Links have descriptive text

---

## 📋 Phase 8: Production Readiness Checklist

### Before Deployment

- [ ] All tests in Phase 1-7 passed
- [ ] Lighthouse score 90+
- [ ] No console errors
- [ ] HTTPS configured
- [ ] Domain points to server
- [ ] SSL certificate installed
- [ ] .env configured for production
- [ ] Database backups working
- [ ] Monitoring alerts setup
- [ ] Support email configured

### Deployment Checklist

- [ ] Brand name updated everywhere
- [ ] Legal pages customized
- [ ] Contact information updated
- [ ] Sitemap updated
- [ ] robots.txt configured
- [ ] Google Search Console ready
- [ ] Analytics tracking added (optional)
- [ ] Error tracking setup (optional)
- [ ] Performance monitoring setup

### Post-Launch Testing

- [ ] Website loads from browser
- [ ] Download feature works
- [ ] All pages accessible
- [ ] Mobile responsiveness works
- [ ] Dark/Light mode works
- [ ] Contact links work
- [ ] No errors in logs
- [ ] Performance metrics good

---

## 🐛 Debugging Tips

### View Console Errors
```
Desktop & Mobile: F12 → Console tab
Look for red errors
```

### View Network Requests
```
F12 → Network tab
Filter by type (XHR for API calls)
Check response status and timing
```

### View Server Logs
```bash
# In terminal running npm run dev
Look for [timestamp] GET/POST messages
Check for any ERROR lines
```

### Clear Cache & Cookies
```
F12 → Application tab → Storage
Clear cookies, cache, local storage
Reload page fresh
```

### Test on Real Device
```
Get IP address of dev machine
On phone: http://YOUR_IP:3000
Test all features on real device
```

---

## ✅ Sign-Off Template

```
Testing Date: ________________
Tester Name: ________________
Browser: ____________________
Device: _____________________

All Tests Passed: [ ] Yes [ ] No

Issues Found:
_________________________________
_________________________________
_________________________________

Ready for Production: [ ] Yes [ ] No

Signature: ____________________ Date: _____
```

---

## 📞 Contact for Issues

If issues found during testing:

1. **Note the exact error message**
2. **Document steps to reproduce**
3. **Check browser console (F12) for errors**
4. **Check server logs for errors**
5. **Try in a different browser**
6. **Clear cache and try again**

---

**Good luck with testing! 🚀**

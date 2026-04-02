# 📚 DEPLOYMENT GUIDE - cPanel Hosting

Complete step-by-step guide to deploy SNIPMETA on cPanel hosting.

## ⚙️ Prerequisites

- cPanel hosting account with Node.js support
- SSH access (optional but recommended)
- Domain name (or subdomain)
- yt-dlp installed on server (handled by your hosting provider or manually)

## 📋 Step 1: Prepare Your Files

Before uploading, optimize your project:

```bash
# Install production dependencies only
npm install --production

# Create optimized build (optional)
npm run build  # if available
```

Ensure `.env` is configured for production:
```
PORT=3000
NODE_ENV=production
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=30
API_TIMEOUT=30000
```

## 📤 Step 2: Upload Files to cPanel

### Method A: File Manager (Easiest)

1. **Login to cPanel**
   - Go to https://yourdomain.com:2083
   - Enter your cPanel username and password

2. **Navigate to File Manager**
   - Find "File Manager" in cPanel dashboard
   - Click to open

3. **Navigate to Public HTML**
   - Select "public_html" folder
   - This is your website root directory

4. **Upload Project**
   - Create new folder: `instatube` (or use existing)
   - Upload all project files:
     - `src/` folder
     - `public/` folder
     - `node_modules/` folder
     - `package.json`
     - `.env`
   
5. **Set Permissions**
   - Right-click folders → Change Permissions
   - Set to `755` for directories
   - Set to `644` for files

### Method B: FTP (If File Manager Unavailable)

```bash
# Using FileZilla or command line FTP
ftp your-cpanel-ftp-address

# Upload files
put -R ./src /public_html/instatube/
put -R ./public /public_html/instatube/
put -R ./node_modules /public_html/instatube/
put package.json /public_html/instatube/
put .env /public_html/instatube/
```

### Method C: SSH (Recommended for Developers)

```bash
# SSH into your server
ssh username@yourdomain.com

# Navigate to public_html
cd ~/public_html

# Clone your repository or copy files
git clone https://github.com/yourepo/instatube.git
# OR
rsync -avz local-folder/ username@yourdomain.com:~/public_html/

# Install dependencies
cd instatube
npm install --production
```

## 🚀 Step 3: Create Node.js Application in cPanel

1. **Access Node.js App in cPanel**
   - Look for "Node.js App" or "Node.js Applications"
   - Click to open

2. **Click "Create Application"**

3. **Configure Application Settings:**

   | Setting | Value |
   |---------|-------|
   | **Node.js Version** | 18.x or 20.x (latest stable) |
   | **Application root** | `/home/username/public_html/instatube` |
   | **Application URL** | `yourdomain.com` or `api.yourdomain.com` |
   | **Application startup file** | `src/server.js` |
   | **Passenger log file** | `/home/username/public_html/instatube/logs/app.log` |
   | **Run as user** | `username` |

4. **Click "Create"**

5. The application should automatically start!

## 🔧 Step 4: Configure Environment & Dependencies

### Check yt-dlp Installation

In cPanel Terminal:
```bash
yt-dlp --version
```

If not installed:
```bash
pip install yt-dlp
# or
sudo apt-get install yt-dlp  # For cPanel on Linux
```

### Verify Node Modules

```bash
cd ~/public_html/instatube
npm install  # Make sure all dependencies are installed
```

## 🌐 Step 5: Configure Domain & HTTPS

### Point Domain to Application

1. **In cPanel - Addon Domains**
   - If using subdomain, create addon domain
   - Point to `/public_html/instatube/public`

2. **Or Use .htaccess Redirect**
   - Create `.htaccess` in `/public_html`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteRule ^instatube(.*)$ http://localhost:3000$1 [P,L]
   </IfModule>
   ```

### Enable HTTPS/SSL

1. **In cPanel - SSL/TLS**
   - Click "Manage SSL sites"
   - Ensure your domain is listed with a certificate

2. **If No Certificate:**
   - Use "AutoSSL" to auto-generate free Let's Encrypt certificate
   - Or manually add certificate

3. **Force HTTPS** (in cPanel - .htaccess)
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## ✅ Step 6: Verify Installation

1. **Check Application Status**
   - Go to cPanel "Node.js App" 
   - Verify status shows "Running"

2. **Test Website**
   - Open https://yourdomain.com in browser
   - Should see InstaTube homepage

3. **Test API Endpoint**
   ```bash
   curl https://yourdomain.com/api/health
   # Should return: {"status":"ok","timestamp":"..."}
   ```

4. **Test Download**
   - Use browser to test video download
   - Paste sample Instagram/Threads URL

## 🔒 Step 7: Security Configuration

### Create .env File (Done in Step 2)

Verify `.env` contains:
```
PORT=3000
NODE_ENV=production
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=30
```

### Configure Firewall (If Available)

In cPanel Security - IP Whitelist/Blacklist:
- Block malicious IPs
- Allow trusted IPs only (optional)

### Setup Error Logging

Create `logs/` directory:
```bash
mkdir -p ~/public_html/instatube/logs
chmod 755 ~/public_html/instatube/logs
```

## 📊 Step 8: Monitor Application

### View Application Logs

In cPanel - Node.js App:
1. Click your application
2. See "Recent Warnings" and error messages
3. Check `/home/username/public_html/instatube/logs/app.log`

### Restart Application

If issues occur:
1. Go to Node.js App in cPanel
2. Click restart/restart application
3. Monitor logs for errors

### Check Resource Usage

In cPanel - Resource Usage:
- Monitor CPU, Memory, Disk usage
- Optimize if exceeding limits

## 🚨 Troubleshooting

### Application Won't Start

1. **Check Node.js version compatibility**
   ```bash
   node --version  # Should be 14+
   ```

2. **Check for missing dependencies**
   ```bash
   cd ~/public_html/instatube
   npm install
   ```

3. **Check error logs**
   - Look at application log in cPanel
   - Check `/home/user/public_html/instatube/logs/app.log`

### Cannot Connect to Port 3000

This is normal! cPanel handles port forwarding through Passenger.
- Your app runs internally
- cPanel proxies requests from port 80/443 to your app

### Video Download Not Working

1. **Verify yt-dlp is installed**
   ```bash
   yt-dlp --version
   ```

2. **Check permissions**
   - Ensure `www-data` user can execute yt-dlp

3. **Test manually**
   ```bash
   yt-dlp "https://www.instagram.com/p/ABC123/"
   ```

### Rate Limiting Too Strict

Edit `.env` in cPanel File Manager:
```
RATE_LIMIT_MAX_REQUESTS=50  # Increase limit
RATE_LIMIT_WINDOW=15        # Keep 15 min window
```

Then restart application from cPanel Node.js App.

## 📈 Performance Tips

### 1. Enable Caching

Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
```

### 2. Enable Gzip Compression

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml
  AddOutputFilterByType DEFLATE text/css text/javascript
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### 3. Optimize Database

Not applicable (stateless app), but monitor API response times.

## 🔄 Update & Maintenance

### Update Node Modules

```bash
cd ~/public_html/instatube
npm update
# or
npm install --save-dev
```

### Backup Application

In cPanel - Backups:
1. Create full backup or selective backup
2. Include home directory where app is located
3. Schedule automatic daily backups

### Monitor for Issues

1. Set up monitoring service
2. Get alerts if application crashes
3. Set up automatic restarts (if available in cPanel)

## 🎉 Success!

Your InstaTube application is now live! 

**Next Steps:**
1. Test all features (video download, theme toggle, etc.)
2. Share the website
3. Monitor performance
4. Collect user feedback
5. Plan updates and improvements

## 📞 Support Resources

- cPanel Support: https://support.cpanel.net
- Node.js Docs: https://nodejs.org/docs/
- yt-dlp Docs: https://github.com/yt-dlp/yt-dlp
- Let's Encrypt: https://letsencrypt.org

---

**Deployment completed successfully! 🚀**

#!/bin/bash
# Installation script for Linux servers (automated setup)

set -e

echo "🚀 SNIPMETA Installation Script"
echo "=================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  This script should be run as root or with sudo"
    exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo "⬇️  Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
else
    echo "✅ Node.js is already installed: $(node --version)"
fi

# Install yt-dlp if not installed
if ! command -v yt-dlp &> /dev/null; then
    echo "⬇️  Installing yt-dlp..."
    apt-get install -y yt-dlp
else
    echo "✅ yt-dlp is already installed: $(yt-dlp --version)"
fi

# Install npm packages
echo "📦 Installing npm packages..."
cd /var/www/instatube
npm install --production

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs
chmod 755 logs

# Set permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/instatube
chmod -R 755 /var/www/instatube

# Install PM2 for process management
echo "📊 Installing PM2..."
npm install -g pm2

# Start application with PM2
echo "🟢 Starting application..."
pm2 start src/server.js --name "instatube"
pm2 startup
pm2 save

# Install and configure Nginx
echo "🌐 Installing Nginx..."
apt-get install -y nginx

# Create Nginx config
echo "⚙️  Configuring Nginx..."
cat > /etc/nginx/sites-available/instatube << EOF
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/html text/plain text/xml text/css text/javascript application/javascript application/json;
}
EOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/instatube /etc/nginx/sites-enabled/instatube
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

# Start Nginx
echo "🟢 Starting Nginx..."
systemctl restart nginx
systemctl enable nginx

# Install Certbot for SSL
echo "🔒 Installing Certbot for SSL..."
apt-get install -y certbot python3-certbot-nginx

echo ""
echo "✅ Installation Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update domain name in Nginx config: /etc/nginx/sites-available/instatube"
echo "2. Setup SSL certificate: sudo certbot --nginx -d yourdomain.com"
echo "3. Update .env file with production settings"
echo "4. Verify app is running: pm2 logs instatube"
echo "5. Check website: http://yourdomain.com"
echo ""
echo "🚀 Your SNIPMETA is ready!"

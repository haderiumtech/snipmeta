/**
 * Instagram & Threads Video Downloader
 * Main JavaScript Application
 */

// ============================================
// THEME MANAGEMENT
// ============================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.initTheme();
    }

    initTheme() {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (prefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${theme}-mode`);
        localStorage.setItem('theme', theme);
        document.documentElement.style.colorScheme = theme;
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// ============================================
// VIDEO DOWNLOADER
// ============================================

class VideoDownloader {
    constructor() {
        this.downloadForm = document.getElementById('downloadForm');
        this.urlInput = document.getElementById('urlInput');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.previewSection = document.getElementById('previewSection');
        this.errorMessage = document.getElementById('errorMessage');
        this.inputHelp = document.getElementById('inputHelp');
        this.videoThumbnail = document.getElementById('videoThumbnail');
        this.videoTitle = document.getElementById('videoTitle');
        this.downloadLink = document.getElementById('downloadLink');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        this.newDownloadBtn = document.getElementById('newDownloadBtn');

        this.API_ENDPOINT = '/api/download';
        this.init();
    }

    init() {
        this.downloadForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.copyLinkBtn.addEventListener('click', () => this.copyToClipboard());
        this.newDownloadBtn.addEventListener('click', () => this.reset());
        this.urlInput.addEventListener('input', () => this.clearMessages());
    }

    handleSubmit(e) {
        e.preventDefault();
        const url = this.urlInput.value.trim();

        if (!this.validateURL(url)) {
            return;
        }

        this.download(url);
    }

    validateURL(url) {
        const instagramPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv|stories)\/[\w-]+\/?(\?.*)?$/i;
        const threadsPattern = /^(https?:\/\/)?(www\.)?threads\.(net|com)\/@[\w.]+\/post\/[\w]+\/?(\?.*)?$/i;
        const shortInstagramPattern = /^(https?:\/\/)?(www\.)?ig\.me\/[\w]+\/?(\?.*)?$/i;
        const twitterPattern = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+\/?(\?.*)?$/i;
        const facebookPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/.*?(watch|video|share|reel)/i;

        if (!url) {
            this.showError('Please enter a URL');
            return false;
        }

        if (!instagramPattern.test(url) && !threadsPattern.test(url) && !shortInstagramPattern.test(url) && 
            !twitterPattern.test(url) && !facebookPattern.test(url)) {
            this.showError('Please enter a valid Instagram, Threads, Twitter, or Facebook URL');
            return false;
        }

        return true;
    }

    async download(url) {
        try {
            this.showLoading();
            this.clearMessages();

            const response = await fetch(this.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch video');
            }

            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch video');
            }

            this.displayVideo(data.data);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    displayVideo(videoData) {
        // Set thumbnail
        if (videoData.thumbnail) {
            this.videoThumbnail.src = videoData.thumbnail;
            this.videoThumbnail.alt = videoData.title;
        }

        // Set title
        this.videoTitle.textContent = videoData.title || 'Downloaded Video';

        // Set download link
        if (videoData.video_url) {
            this.downloadLink.href = videoData.video_url;
            this.downloadLink.download = `instagram-video-${Date.now()}.${videoData.ext || 'mp4'}`;
        }

        // Show preview section
        this.previewSection.style.display = 'block';
        this.previewSection.scrollIntoView({ behavior: 'smooth' });
    }

    copyToClipboard() {
        const url = this.downloadLink.href;
        navigator.clipboard.writeText(url).then(() => {
            const originalText = this.copyLinkBtn.textContent;
            this.copyLinkBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                this.copyLinkBtn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            alert('Failed to copy link');
        });
    }

    reset() {
        this.urlInput.value = '';
        this.previewSection.style.display = 'none';
        this.errorMessage.style.display = 'none';
        this.inputHelp.textContent = '';
        this.urlInput.focus();
    }

    showLoading() {
        this.loadingSpinner.style.display = 'flex';
        this.previewSection.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }

    hideLoading() {
        this.loadingSpinner.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.previewSection.style.display = 'none';
    }

    clearMessages() {
        this.errorMessage.style.display = 'none';
        this.inputHelp.textContent = '';
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new VideoDownloader();

    // Log page speed metrics (Optional - for debugging)
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
            }, 0);
        });
    }
});

// Service Worker Registration (Optional - for PWA features)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service Worker registration failed, app will still work
    });
}

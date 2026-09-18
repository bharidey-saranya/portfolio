const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf'
};

// Robust resolution checking process.cwd(), __dirname, and parent directories
function resolveFilePath(relativePath) {
  if (!relativePath) return null;
  const clean = relativePath.replace(/^[/\\]+/, '');
  const searchDirs = [
    process.cwd(),
    __dirname,
    path.join(__dirname, '..'),
    path.join(process.cwd(), '..')
  ];

  for (const dir of searchDirs) {
    const candidate = path.join(dir, clean);
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate;
      }
    } catch (e) {}
  }
  return null;
}

// In-memory cache for critical assets to ensure zero-IO high-performance delivery
const staticCache = {};
function preload() {
  const files = ['index.html', 'style.css', 'script.js', 'favicon.svg', 'favicon.ico'];
  for (const f of files) {
    const p = resolveFilePath(f);
    if (p) {
      try {
        staticCache[f] = fs.readFileSync(p);
      } catch (e) {}
    }
  }
}
preload();

function handler(req, res) {
  let reqPath = (req.url || '/').split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Handle API contact submissions
  if (req.method === 'POST' && (reqPath === '/api/contact' || reqPath === '/api/contact/')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        console.log('📬 [Portfolio Contact Inquiry Received]:', {
          name: data.name,
          email: data.email,
          subject: data.subject,
          timestamp: new Date().toISOString()
        });
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: true,
          message: `Inquiry from ${data.name || 'Visitor'} logged successfully.`
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // Security: Clean and normalize path to avoid traversal attacks
  const safeSuffix = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '').replace(/^[/\\]+/, '');

  // 1. Check in-memory static cache
  if (staticCache[safeSuffix]) {
    const ext = path.extname(safeSuffix).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/plain';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff'
    });
    return res.end(staticCache[safeSuffix]);
  }

  // 2. Resolve on filesystem (e.g. assets/*)
  let targetFile = resolveFilePath(safeSuffix);

  // 3. SPA Fallback: if not found, serve index.html
  if (!targetFile) {
    if (staticCache['index.html']) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'X-Content-Type-Options': 'nosniff'
      });
      return res.end(staticCache['index.html']);
    }
    targetFile = resolveFilePath('index.html');
  }

  if (targetFile) {
    const ext = path.extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    try {
      const content = fs.readFileSync(targetFile);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff'
      });
      return res.end(content);
    } catch (readErr) {
      console.error(`Error reading ${targetFile}:`, readErr);
    }
  }

  // 4. If all fails, 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
}

// Export for Vercel Serverless Function runtime
module.exports = handler;

// Allow direct execution: `node index.js`
if (require.main === module) {
  const PORT = process.env.PORT || 5500;
  const server = http.createServer(handler);
  server.listen(PORT, () => {
    console.log(`Portfolio server active at http://localhost:${PORT}`);
  });
}

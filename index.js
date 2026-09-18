const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function handler(req, res) {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Security: Prevent directory traversal
  const safeSuffix = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safeSuffix);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback: If not found, serve index.html for single-page routing
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (indexErr, indexContent) => {
        if (indexErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(indexContent);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
}

// Export for Vercel Node.js serverless runtime
module.exports = handler;

// Also allow running directly with `node index.js` locally
if (require.main === module) {
  const PORT = process.env.PORT || 5500;
  const server = http.createServer(handler);
  server.listen(PORT, () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
  });
}

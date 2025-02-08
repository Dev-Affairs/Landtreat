const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const next = require('next');
const serverConfig = require('./ServerConf.json');
const http = require('http'); // For API redirection

// Next.js app
const dev = false//process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Paths to the admin and blog build folders
const adminFolder = path.join(__dirname, 'client', 'app'); // Angular Admin App
const blogFolder = path.join(__dirname, 'client', 'blog');   // Blog SPA

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // Redirect /api routes to the API server on port 5000
        console.log("pathname ==", pathname)
        if (pathname.startsWith('/api')) {
            forwardToApiServer(req, res);
        }

        // Handle admin routes
        if (pathname.startsWith('/app')) {
            const filePath = path.join(adminFolder, pathname.replace('/app', '') || 'index.html');
            serveSPA(filePath, res, adminFolder);
        }
        // Handle blog routes
        else if (pathname.startsWith('/blog')) {
            const filePath = path.join(blogFolder, pathname.replace('/blog', '') || 'index.html');
            serveSPA(filePath, res, blogFolder);
        }
        // Handle other routes with Next.js
        else {
            handle(req, res, parsedUrl);
        }
    }).listen(serverConfig.PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${serverConfig.PORT}`);
    });
});

// Helper function to serve SPA files (admin and blog)
function serveSPA(filePath, res, rootFolder) {
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If file is missing, serve `index.html` for SPA routing
            const indexPath = path.join(rootFolder, 'index.html');
            fs.readFile(indexPath, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error loading index.html');
                } else {
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            });
        } else {
            // Serve the requested file
            const ext = path.extname(filePath);
            const contentType = getContentType(ext);

            if (contentType) {
                res.setHeader('Content-Type', contentType);
            }

            const stream = fs.createReadStream(filePath);
            stream.on('error', () => {
                res.statusCode = 500;
                res.end('Error reading file');
            });
            stream.pipe(res);
        }
    });
}

// Helper function to forward /api requests to the API server
function forwardToApiServer(req, res) {
    const options = {
        hostname: 'localhost',
        port: serverConfig.ApiServer.PORT,
        path: req.url,
        method: req.method,
        headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
        console.error('Error forwarding request to API server:', err);
        res.statusCode = 500;
        res.end('Error communicating with API server');
    });

    req.pipe(proxyReq, { end: true });
}

// Helper function to determine content type
function getContentType(ext) {
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        case '.woff':
            return 'font/woff';
        case '.woff2':
            return 'font/woff2';
        case '.ttf':
            return 'font/ttf';
        case '.eot':
            return 'application/vnd.ms-fontobject';
        default:
            return null;
    }
}


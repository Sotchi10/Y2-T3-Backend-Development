// server.js
const http = require('http');

const navbar = `
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact-us">Contact</a>
        <a href="/products">Products</a>
        <a href="/projects">Projects</a>
    </nav>
`;

const htmlPage = (title, heading, message) => `
    <html>
        <head><title>${title}</title></head>
        <body>
            ${navbar}
            <h1>${heading}</h1>
            <p>${message}</p>
        </body>
    </html>
`;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (method !== 'GET') {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        return res.end('403 Method Not Allowed');
    }

    switch (url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(htmlPage(
                'Home',
                'Welcome to the Home Page',
                'This is a simple Node.js server.'
            ));

        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(htmlPage(
                'About us',
                'Welcome to the About us Page',
                'At CADT, we love Node.js!'
            ));

        case '/contact-us':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(htmlPage(
                'Contact',
                'Welcome to the Contact Page',
                'You can reach us via email...'
            ));

        case '/products':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(htmlPage(
                'Products',
                'Welcome to the Products Page',
                'Buy one get one...'
            ));

        case '/projects':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(htmlPage(
                'Projects',
                'Welcome to the Projects Page',
                'Here are our awesome projects.'
            ));

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/hi');
});

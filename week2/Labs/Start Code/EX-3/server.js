const { readFile } = require('fs');
const { writeFile } = require('fs/promises');
// server.js
const http = require('http');

const navBar = `
        <nav>
            <a href = "/">Home</a>
            <a href = "/contact">Contact</a>
        <nav/>
`;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(
            `
                <html><title>Home</title></html>
                ${navBar}
                <p>'Welcome to the Home Page'</p>
            `
        );
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
        <html><title>Form</title></html>
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {
        // Implement form submission handling
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const parsed = new URLSearchParams(body);
                const name = parsed.get('name');
                if (!name || name.trim() === '') {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end(`
                    <h1>Error</h1>
                    <p>Name is required!</p>
                    <a href="/contact">Go back</a>
                `);
                }
                console.log('Submitted name:', name);

                const filePath = './EX-3/submissions.json';
                let submissions = [];

                try {
                    const data = await require('fs/promises').readFile(filePath, 'utf-8');
                    submissions = JSON.parse(data);
                } catch (err) {
                    submissions = [];
                }

                submissions.push({ name: name.trim() });

                await writeFile(filePath, JSON.stringify(submissions, null, 2));

                await writeFile('./EX-3/submissions.txt', name + '\n', { flag: 'a' });

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(
                    `
                        <a href="/contact">Go Back</a>
                        <h1>Thank you, ${name}!</h1>
                    `);

            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

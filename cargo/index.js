const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

    let files = [
        fs.readFileSync('app/partial/header.html'),
        '<style>',
        fs.readFileSync('app/style.css'),
        '</style>',
        fs.readFileSync('app/index.html'),
        '<script>',
        fs.readFileSync('app/script.js'),
        '</script>',
        fs.readFileSync('app/partial/footer.html')
    ];

    Promise.all(files)
        .then(files.map(f => f.toString('utf-8')))
        .then(() => {
            const content = files.join('');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(content);
        })
});

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}/`);
});
const http = require('http');
const fs = require('fs');
const url = require('url');
const lookup = require('mime-types').lookup;

const port = 3000;

const server = http.createServer((req,res) => {
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.path.replace(/^\/+|\/+$/g, '');
    
    if(path === '') {
        path = 'index.html';
    }

    console.log(`Requested path: ${path}`);

    let file = __dirname + '/public/' + path;

    fs.readFile(file, (error,content) => {
        if(error) {
            console.log('File not found:', file);
            res.writeHead(404);
            res.write('Something went wrong :(');
            res.end();
        } else {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            let mime = lookup(path);
            res.writeHead(200, {'Content-type': mime});
            res.end(content);
        }
    });
});

server.listen(port, error => {
    if(error) {
        console.log('Something went wrong', error);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});
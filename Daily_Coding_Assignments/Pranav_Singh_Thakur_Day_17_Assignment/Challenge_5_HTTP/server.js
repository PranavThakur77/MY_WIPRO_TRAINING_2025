const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello from Node.js Server");
    }

    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("About Page");
    }

    else if (req.url === "/home") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("File not found");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

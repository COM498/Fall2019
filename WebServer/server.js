const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 80;
//var FILE_PATH = "C:\\Users\\brianna.weaver\\Documents\\GitHub\\Fall2019\\WebApp\\Build Notes\\"; 
var FILE_PATH = process.env.FILE_PATH;

var app = http.createServer(function(req, res) {
    console.log("Requesting file...");

    var filePath = FILE_PATH + req.url.split('/')[1];
    console.log(req.url);
    console.log(filePath);

    var extname = path.extname(filePath);
    var contentType = 'text/plain';
    let mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt',
        '.txt': 'text/plain'
      };

    contentType = mimeTypes[extname];

    fs.readFile(filePath, function(err, content) {
        if (err) {
            console.log("Error: " + err.code);
        }
        else {
            res.setHeader("'Content-Type'", "'" + contentType + "'");
            res.end(content, 'utf-8');
        }
    });
});

app.listen(port);

console.log("App listening on port " + port);
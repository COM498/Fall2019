//required modules
const http = require('http');
const fs = require('fs');
const fssync = require('fs-sync');
const path = require('path');
const downloads = require('downloads-folder');

const port = 80;
var FILE_PATH = process.env.FILE_PATH;

var app = http.createServer(function(req, res) {
    console.log("Requesting file...");
    //req.url = " " + req.url;
    var filePath = FILE_PATH + req.url.split('/')[1];
    console.log(req.url);
    console.log(filePath);
    console.log("file");

    //gets mimetype based on extension
    var extname = path.extname(filePath).toLowerCase();
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
        '.txt': 'text/plain',
        '.pdf': 'application/pdf',
        '.zip': 'application/zip'
      };

      contentType = mimeTypes[extname];
      console.log(extname);
      console.log(contentType);

    //reads image as binary
    if (extname == '.zip' || extname =='.jpg' || extname == '.png' || extname == '.ico' || extname == '.eot' || extname == '.ttf' || extname == '.svg') {
        let file = fs.readFileSync(filePath);
        res.setHeader("'Content-Type'", "'" + contentType + "'");
        res.write(file, 'binary');
        res.end();
    } 
    //reads file as uft8
    else {
        fs.readFile(filePath, 'utf8', function(err, contents) {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                res.setHeader("'Content-Type'", "'" + contentType + "'");
                res.end(contents);
            }
        })
    }
});

app.listen(port);

console.log("App listening on port " + port);
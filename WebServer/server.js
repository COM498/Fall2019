const http = require('http');
const fs = require('fs');
const fssync = require('fs-sync');
const path = require('path');
const downloads = require('downloads-folder');

const port = 80;
//var FILE_PATH = "C:\\Users\\brianna.weaver\\Documents\\"; 
var FILE_PATH = process.env.FILE_PATH;
var DOWNLOAD_PATH = downloads();

var app = http.createServer(function(req, res) {
    console.log("Requesting file...");

    var filePath = FILE_PATH + req.url.split('/')[1];
    //var downPath = DOWNLOAD_PATH + "\\" + req.url.split('/')[1];
    var downPath = req.url.split('/')[1];
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

    if (extname =='.jpg' || extname == '.png' || extname == '.ico' || extname == '.eot' || extname == '.ttf' || extname == '.svg') {
        // let file = fs.readFileSync(filePath);
        // res.setHeader("'Content-Type'", "'" + contentType + "'");
        // res.write(file, 'binary');
        // res.end();

        fssync.copy(filePath, downPath, {encoding: 'binary'}, function(err) {
            if (err) console.error(err.stack);
            else {
                console.log(downPath);
                res.end("OK");
            }
        })
    } 
    else {

        fs.copyFile(filePath, downPath, function(err) {
            if (err) { console.error(err.stack); }
            else {
                console.log(downPath);
                res.end("OK");
            }
        })

        // fs.readFile(filePath, 'utf8', function(err, content) {
        //     if (err) {
        //         console.log("Error: " + err.code);
        //     }
        //     else {
        //         res.setHeader("'Content-Type'", "'" + contentType + "'");
        //         res.end(content);
        //     }
        // });
        
    }
});

app.listen(port);

console.log("App listening on port " + port);
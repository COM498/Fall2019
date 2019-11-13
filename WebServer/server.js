const http = require('http');
const fs = require('fs');
const fssync = require('fs-sync');
const path = require('path');
const downloads = require('downloads-folder');
const sniffr = require('sniffr');

var s = new sniffr();
const port = 80;
//var FILE_PATH = "C:\\Users\\brianna.weaver\\Documents\\"; 
var FILE_PATH = process.env.FILE_PATH;
var DOWNLOAD_PATH = downloads();

var app = http.createServer(function(req, res) {
    const userAgent = req.headers['user-agent'];
    s.sniff(userAgent);
    //console.log(userAgent);
    //console.log(s.os);

    //console.log(DOWNLOAD_PATH);

    if (s.os["name"] === 'windows') {
        DOWNLOAD_PATH = "C:\\";
    } 
    else if (s.os["name"] === 'linux') {
        DOWNLOAD_PATH = "";
    }
    else if (s.os["name"] === 'macos') {
        DOWNLOAD_PATH = "~/Downloads";
    }

    console.log("Requesting file...");

    var filePath = FILE_PATH + req.url.split('/')[1];
    var downPath = DOWNLOAD_PATH + "\\" + req.url.split('/')[1];
    //var downPath = req.url.split('/')[1];
    console.log(req.url);
    console.log(filePath);

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
        '.txt': 'text/plain'
      };

      contentType = mimeTypes[extname];
      console.log(extname);
      console.log(contentType);

    if (extname =='.jpg' || extname == '.png' || extname == '.ico' || extname == '.eot' || extname == '.ttf' || extname == '.svg') {
        let file = fs.readFileSync(filePath);
        res.setHeader("'Content-Type'", "'" + contentType + "'");
        res.write(file, 'binary');
        res.end();

        // fssync.copy(filePath, downPath, {encoding: 'binary'}, function(err) {
        //     if (err) console.error(err.stack);
        //     else {
        //         console.log(downPath);
        //         res.end("OK");
        //     }
        // })
    } 
    else {

        // fs.copyFile(filePath, downPath, function(err) {
        //     if (err) { console.error(err.stack); }
        //     else {
        //         console.log(downPath);
        //         res.end("OK");
        //     }
        // })        
    }
});

app.listen(port);

console.log("App listening on port " + port);
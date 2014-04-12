var http = require('http');
var fs = require('fs');

var file = "/var/www/excuses";

var server = new http.Server();
var port = 8787;

var data = excuses = excuse = content = "";
var select = 0;
var time = new Date();

server.on("request", function (req, res) {
    var data = fs.readFileSync(file, "utf-8");
    if (data) {
        excuses = data.split("\n");
        select = Math.floor(Math.random() * excuses.length);
        excuse = excuses[select];
    } else {
        excuse = "ERROR!\nCANNOT ACCESS THE EXCUSE FILE!\nDON\'T EXPECT THE REST TO WORK!";
    }
    content = "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n" +
            "<title>BOFH Style Excuses</title>\n<style type=\"text/css\">body{font-family:monospace,sans-serif;}</style>\n</head>\n<body>\n" +
            "<center>\n<h1>" +
            excuse +
            "</h1>\n<p>Server by <a href=\"http://g.jamesliu.info/\" target=\"_blank\">James Liu</a></p>\n" +
            "<p><a href=\"https://raw.githubusercontent.com/jamesliu96/bofh/master/excuses\" target=\"_blank\">List</a> by <a href=\"http://pages.cs.wisc.edu/~ballard/bofh/\" target=\"_blank\">Jeff Ballard</a></p>" +
            "</center>\n</body>\n</html>";
    if (content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        console.log(time, select, excuse);
        res.write(content);
    } else {
        res.writeHead(500, {"Content-Type": "text/plain"});
    }
    res.end();
});

server.listen(port, console.log("BOFH listening at port:", port));

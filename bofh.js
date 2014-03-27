var http = require('http');
var fs = require('fs');

var file = "/var/bofh/excuses";

var server = new http.Server();
var port = 8787;

var data = excuses = excuse = content = "";
var select = 0;

server.on("request", function (req, res) {
    var data = fs.readFileSync(file, "utf-8");
    if (data) {
        excuses = data.split("\n");
        select = Math.floor(Math.random() * excuses.length);
        excuse = excuses[select];
    } else {
        excuse = "ERROR!\nCANNOT ACCESS THE EXCUSE FILE!\nDON\'T EXPECT THE REST TO WORK!";
    }
    content = "<!DOCTYPE html><html><body><head><meta charset=\"utf-8\">" +
            "<title>BOFH Style Excuses</title></head><body>" +
            "<center><h1>" +
            excuse +
            "</h1></center></body></html>";
    if (content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        console.log(select,excuse);
        res.write(content);
    } else {
        res.writeHead(500, {"Content-Type": "text/plain"});
    }
    res.end();
});

server.listen(port, console.log("BOFH listening at port:", port));

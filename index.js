var fs = require("fs");
var path = require("path");

function build(options){
  console.log(options.src)
  console.log(options.dist)
}

var DEFAULT_PORT = 8000;
var DEFAULT_ENCODE = "utf-8";

function server(cwd, options){
  var port = options.port || DEFAULT_PORT;
  var encode = options.encode || DEFAULT_ENCODE;

  var fileName = options.args.join("");
  if (!fs.existsSync(fileName)) {
    console.error("Not Found:", fileName);
    return;
  }

  var http = require('http').createServer(function (req, res) {
    var url = req.url;

    if (url === "/") {
      fs.readFile(path.join(__dirname, "template", "index.html"), encode, function(err, html){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html.replace("{FILE_NANE}", fileName));
      });
    } else if (url === "/" + fileName) {
      fs.readFile(path.join(cwd, fileName), encode, function(err, markdown){
        res.writeHead(200, {'Content-Type': 'text/markdown'});
        res.end(markdown);
      });
    } else {

      var MIME_TYPE = {
        "html": "text/html",
        "js": "text/javascript",
        "css": "text/css"
      };

      if (url === "/") {
        url = "index.html";
      }

      var ext = url.split(".");
      ext = ext[ext.length - 1];

      var filePath = path.join(__dirname, "template", url);
      if (MIME_TYPE.hasOwnProperty(ext) && fs.existsSync(filePath)) {

        fs.readFile(filePath, encode, function(err, html){
          res.writeHead(200, {'Content-Type': MIME_TYPE[ext]});
          res.end(html.replace("{FILE_NANE}", fileName));
        });

      } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404\n');
      }

    }
  }).listen(port).on("error", function(error){
    console.error(error);
  });
  console.log("Server Started 127.0.0.1:" + port);
}

function watch(){
}

module.exports = {
  build: build,
  server: server,
  watch: watch
}


function build(options){
  console.log(options.src)
  console.log(options.dist)
}

function server(options){
  var http = require('http');
  var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  });
  app.listen(8080);
  console.log("Server Started 127.0.0.1:8080")
}

function watch(){
}

module.exports = {
  build: build,
  server: server,
  watch: watch
}

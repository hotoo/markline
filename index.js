var fs = require("fs");
var path = require("path");
var gulp = require("gulp");
var replace = require("gulp-replace");
var del = require("del");
var Event = require("events").EventEmitter;

var evt = new Event();

var DEFAULT_DIST = "dist";
var DEFAULT_PORT = 8000;
var DEFAULT_ENCODE = "utf-8";

function build(cwd, options){
  var fileName = options.args[0] || "";
  var encode = options.encode || DEFAULT_ENCODE;
  var template_dir = path.join(__dirname, "template");
  var dist_dir = options.dist || path.join(cwd, DEFAULT_DIST);

  if (!fileName || !fs.existsSync(fileName)) {
    console.error("Not Found:", fileName);
    return;
  }

  del(dist_dir, function(){

    gulp.src(path.join(template_dir, '**'), { dot: true })
      .pipe(replace(/\{FILE_NANE\}/g, path.basename(fileName) ))
      .pipe(gulp.dest(dist_dir));

    gulp.src(path.join(cwd, fileName))
      .pipe(gulp.dest(dist_dir));

  });

}

function server(cwd, options){
  var port = options.port || DEFAULT_PORT;
  var encode = options.encode || DEFAULT_ENCODE;
  var watch = options.watch || false;
  var fileName = options.args[0] || "";

  if (!fileName || !fs.existsSync(fileName)) {
    console.error("Not Found:", fileName);
    return;
  }

  var app = require('http').createServer(function (req, res) {
    var url = req.url.split(/[?#]/)[0];

    if (url === "/" + fileName) {
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
        url = "/index.html";
      }

      var ext = url.split(".");
      ext = ext[ext.length - 1];

      var filePath = path.join(__dirname, "template", url);
      if (MIME_TYPE.hasOwnProperty(ext) && fs.existsSync(filePath)) {

        fs.readFile(filePath, encode, function(err, html){
          res.writeHead(200, {'Content-Type': MIME_TYPE[ext]});
          if (url === "/index.html") {
            html = html.replace('{FILE_NANE}', fileName);

            if (watch) {
              html = html.replace('</body>', [
                  '<script src="/socket.io/socket.io.js"></script><script>',
                  'var socket = io.connect("/");',
                  'socket.on("reload", function() { location.reload(); });',
                  '</script>',
                  '</body>'
                ].join('\n')
              );
            }
          }
          res.end(html);
        });

      } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404\n');
      }

    }
  }).listen(port).on("error", function(error){
    if (error.code === 'EADDRINUSE') {
      console.error('Error: This port is in use, change to another one');
    } else {
      throw error;
    }
  }).on("listening", function(){
    console.log("Server started at 127.0.0.1:" + port);
  });

  if (watch){
    var io = require('socket.io')(app);
    io.sockets.on('connection', function(socket) {
      socket.emit('hello', {message: 'markline'});

      fs.watch(fileName, function(event, fileName) {
        if (!socket.disconnected) {
          socket.emit('reload', {message: fileName});
        }
      });
    });
  }

}

function watch(){
}

module.exports = {
  build: build,
  server: server,
  watch: watch
}

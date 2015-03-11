var jade = require('jade');
var express = require('express');
var serveStatic = require('serve-static');

require('./db/connect');

var server = express();

var PORT = 3000;

server.use(serveStatic('build'));

server.use(require('connect-livereload')({
    port: 35729
}));

server.set('views', __dirname + '/views');
server.set('view engine', 'jade');

require('./routes')(server);

server.listen(PORT, function () {
    console.log( 'Express server listening' );
});

module.exports = server;

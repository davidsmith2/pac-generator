var jade = require('jade');
var express = require('express');
var serveStatic = require('serve-static');

require('./db/connect');

var server = module.exports = express();

server.use(serveStatic('../public'));

server.use(require('connect-livereload')({
    port: 35729
}));

server.set('views', __dirname + '/views');
server.set('view engine', 'jade');

require('./routes')(server);

server.listen(3000, function () {
    console.log( 'Express server listening' );
});

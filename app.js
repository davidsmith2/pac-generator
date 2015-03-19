var jade = require('jade');
var express = require('express');
var serveStatic = require('serve-static');

require('./backend/db/connect');

var app = express();
var env = app.settings.env;
var PORT = 8081;

app.use(serveStatic('build'));

if ('development' === env) {
    app.use(require('connect-livereload')({
        port: 35729
    }));
}

app.set('views', __dirname + '/backend/views');
app.set('view engine', 'jade');

require('./backend/routes')(app);

app.listen(PORT, function () {
    console.log( 'Express server listening' );
});

module.exports = app;

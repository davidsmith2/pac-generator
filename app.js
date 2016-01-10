// imports and basic setup

var express         = require('express');
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');

var jade            = require('jade');
var serveStatic     = require('serve-static');

var configDB        = require('./backend/config/database');

var app             = express();
var port            = 8081;
var env             = app.settings.env;

// configuration

mongoose.connection.on('error', console.error.bind(console, 'Mongoose connection error'));
mongoose.connection.once('open', console.log.bind(console, 'Mongoose connection open'));
mongoose.connect(configDB[env].url, configDB.options);

require('./backend/config/passport')(passport);

// app setup

app.use(morgan('dev'));
app.use(cookieParser());
app.use(serveStatic('build'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

if (env === 'development') {
    app.use(require('connect-livereload')({
        port: 35729
    }));
}

app.set('views', __dirname + '/backend/views');
app.set('view engine', 'jade');

// passport setup

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes

require('./backend/routes')(app, bodyParser, passport);

// launch

app.listen(port, function () {
    console.log( 'Express server listening' );
});

module.exports = app;

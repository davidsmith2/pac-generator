// imports and basic setup

var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var express         = require('express');
var flash           = require('connect-flash');
var jade            = require('jade');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var passport        = require('passport');
var serveStatic     = require('serve-static');
var session         = require('express-session');

var configDB        = require('./config/database');
var configPassport  = require('./config/passport');
var routes 			= require('./routes');

var app             = express();
var port            = 8081;
var env             = app.settings.env;

var setHeaders 		= function (res, path) {
	if (path.split('.')[1] === 'pac') {
		res.setHeader('Content-Type', 'application/x-ns-proxy-autoconfig');
	}
};

// configuration

mongoose.connection.on('error', console.error.bind(console, 'Mongoose connection error'));
mongoose.connection.once('open', console.log.bind(console, 'Mongoose connection open'));
mongoose.connect(configDB[env].url, configDB.options);

configPassport(passport);

// app setup

app.use(morgan('dev'));
app.use(cookieParser());

app.use(serveStatic('dist', {
	setHeaders: setHeaders
}));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
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

routes(app);

// launch

app.listen(port, function () {
    console.log( 'Express server listening' );
});

module.exports = app;

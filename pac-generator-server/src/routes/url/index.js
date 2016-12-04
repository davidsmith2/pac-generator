var passport = require('passport');
var _ = require('underscore');

module.exports = function (app) {

    var appName = 'PAC Generator';

    // home

    app.get('/', function (req, res) {
        res.render('index', {
            appName: appName,
            pageName: 'Home'
        });
    });

    // signup

    app.get('/signup', function (req, res) {
        var flashMessage = req.flash('signupMessage');
        var locals = {
            appName: appName,
            pageName: 'Sign up',
            flashMessage: (flashMessage.length) ? flashMessage : ''
        };
        res.render('signup', locals);
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // login

    app.get('/login', function (req, res) {
        var flashMessage = req.flash('loginMessage');
        var locals = {
            appName: appName,
            pageName: 'Log in',
            flashMessage: (flashMessage.length) ? flashMessage : ''
        };
        res.render('login', locals);
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // dashboard

    var dashboardRoute = function (req, res) {
        res.render('dashboard', {
            appName: appName,
            pageName: 'Dashboard',
            user: req.user
        });
    };

    app.get('/dashboard*', isLoggedIn, dashboardRoute);

    app.get('/dashboard', isLoggedIn, dashboardRoute);

    // logout

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }

};

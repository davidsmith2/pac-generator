var flash           = require('connect-flash');
var LocalStrategy   = require('passport-local').Strategy;
var uuid            = require('uuid');

var User            = require('../models/User');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email address has been taken.'));
            } else {
                var newUser            = new User({_id: email, uuid: uuid()});
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'That user doesn\'t exist.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'That password looks wrong.'));
            }
            return done(null, user);
        });
    }));

};

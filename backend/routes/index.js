module.exports = function (app, bodyParser, passport) {
    require('./url')(app, bodyParser.urlencoded({extended: false}), passport);
    require('./json')(app, bodyParser.json());
};

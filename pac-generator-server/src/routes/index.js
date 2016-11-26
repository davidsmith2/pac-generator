module.exports = function (app) {
    require('./url')(app);
    require('./json')(app);
};

var bodyParser = require('body-parser');

module.exports = function (server) {
    require('./url')(server, bodyParser.urlencoded({extended: false}));
    require('./json')(server, bodyParser.json());
};

var bodyParser = require('body-parser');

module.exports = function (server) {
    require('./url')(server, bodyParser);
    require('./json')(server, bodyParser);
};

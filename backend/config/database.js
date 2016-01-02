var uriUril = require('mongodb-uri');

module.exports = {
    url: uriUril.formatMongoose('mongodb://admin:admin@ds031691.mongolab.com:31691/pac-generator'),
    options: {
        server: {
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
            }
        }
    }
};
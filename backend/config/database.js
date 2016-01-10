var uriUtil = require('mongodb-uri');

module.exports = {
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
    },
    development: {
        url: uriUtil.formatMongoose('mongodb://admin:admin@ds039125.mongolab.com:39125/pac-generator-local')
    },
    production: {
        url: uriUtil.formatMongoose('mongodb://admin:admin@ds031691.mongolab.com:31691/pac-generator')
    }
};

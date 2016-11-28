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
    url: uriUtil.formatMongoose(process.env.DB_URL)
};

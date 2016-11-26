var mongoose = require('mongoose');

var ProxySchema = new mongoose.Schema({
    name: String,
    port: String,
    server: String,
    href: String
});

module.exports = ProxySchema;

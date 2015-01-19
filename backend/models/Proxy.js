var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProxySchema = new Schema({
    name: String,
    port: String,
    exceptions: [String],
    rules: [String]
});

module.exports = mongoose.model('Proxy', ProxySchema);

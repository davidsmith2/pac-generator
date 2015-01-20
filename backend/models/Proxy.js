var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProxySchema = new Schema({
    name: String,
    port: String,
    exceptions: [{type: Schema.Types.ObjectId, ref: 'Exception'}],
    rules: [{type: Schema.Types.ObjectId, ref: 'Rule'}]
});

module.exports = mongoose.model('Proxy', ProxySchema);

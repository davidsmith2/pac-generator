var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RuleSchema = new Schema({
    host: String,
    proxy: String
});

module.exports = mongoose.model('Rule', RuleSchema);

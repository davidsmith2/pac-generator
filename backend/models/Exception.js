var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExceptionSchema = new Schema({
    host: String,
    proxy: String
});

module.exports = mongoose.model('Exception', ExceptionSchema);

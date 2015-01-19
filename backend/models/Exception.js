var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExceptionSchema = new Schema({
    host: String
});

module.exports = mongoose.model('Exception', ExceptionSchema);

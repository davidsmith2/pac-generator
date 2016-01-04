var mongoose = require('mongoose');

module.exports = {
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
};
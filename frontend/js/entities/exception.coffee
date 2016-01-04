Host = require './host'

class Exception extends Host
    urlRoot: '/api/exceptions'
    defaults:
        _creator: window.user.id

module.exports = Exception
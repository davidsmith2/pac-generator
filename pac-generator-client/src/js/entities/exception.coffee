Host = require './host'

class Exception extends Host
    urlRoot: '/api/users/' + window.user.uuid + '/exceptions'

module.exports = Exception
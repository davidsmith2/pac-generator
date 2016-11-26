Host = require './host'

class Rule extends Host
    urlRoot: '/api/users/' + window.user.uuid + '/rules'

module.exports = Rule
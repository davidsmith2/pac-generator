Host = require './host'

class Rule extends Host
    urlRoot: '/api/rules'
    defaults:
        _creator: window.user.id

module.exports = Rule
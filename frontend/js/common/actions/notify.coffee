GrowlView = require '../views/growl'

module.exports = (options) =>
    growlOptions = {}
    growlSettings = {}
    growlOptions.message = options.message || ''
    growlOptions.icon = options.icon || 'glyphicon glyphicon-info-sign'
    growlSettings.type = options.type || 'info'
    return new GrowlView
        options: growlOptions
        settings: growlSettings

GrowlView = require '../../../common/views/growl'

module.exports = (App, controller, options) =>
    growlOptions = {}
    growlSettings = {}
    options.collection.publish
        success: () =>
            growlOptions.icon = 'glyphicon glyphicon-ok'
            growlOptions.message = 'PAC files published for all proxies.'
            growlSettings.type = 'success'
            return new GrowlView
                options: growlOptions
                settings: growlSettings
        error: () =>
            console.log('error publishing PAC files')

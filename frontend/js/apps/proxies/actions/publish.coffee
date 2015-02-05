GrowlView = require '../../../common/views/growl'

module.exports = (App, controller, options) =>
    growlOptions = {}
    growlSettings = {}
    options.model.publish
        success: () =>
            growlOptions.icon = 'glyphicon glyphicon-ok'
            growlOptions.message = 'PAC file published for ' + options.model.get('name') + ' proxy'
            growlSettings.type = 'success'
            return new GrowlView
                options: growlOptions
                settings: growlSettings
        error: () =>
            console.log('error publishing PAC file')

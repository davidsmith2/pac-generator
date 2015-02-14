GrowlView = require '../../../common/views/growl'

module.exports = (App, controller, view) =>
    growlOptions = {}
    growlSettings = {}
    view.model.publish
        success: () =>
            view.disablePublishing()
            growlOptions.icon = 'glyphicon glyphicon-ok'
            growlOptions.message = 'PAC file published for ' + view.model.get('name') + ' proxy'
            growlSettings.type = 'success'
            return new GrowlView
                options: growlOptions
                settings: growlSettings
        error: () =>
            console.log('error publishing PAC file')

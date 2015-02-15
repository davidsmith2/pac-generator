module.exports = (App, controller, view) =>
    view.model.publish
        success: () =>
            opts =
                options:
                    message: 'PAC file published for ' + view.model.get('name') + ' proxy.'
                    icon: 'glyphicon glyphicon-ok'
                settings:
                    type: 'success'
            controller.notify opts
            view.disablePublishing()
        error: () =>
            console.log('error publishing PAC file')

module.exports = (App, controller, options) =>
    options.model.destroy
        success: (__proxy__) =>
            proxyName = __proxy__.get 'name'
            opts =
                options:
                    message: proxyName + ' proxy deleted.'
                    icon: 'glyphicon glyphicon-exclamation-sign'
                settings:
                    type: 'danger'
            controller.notify opts
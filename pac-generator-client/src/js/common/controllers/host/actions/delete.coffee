module.exports = (App, controller, options) =>
    options.model.destroy
        success: (__host__) =>
            hostName = __host__.get 'host'
            opts =
                options:
                    message: hostName + ' host deleted. Please publish PAC files.'
                    icon: 'glyphicon glyphicon-exclamation-sign'
                settings:
                    type: 'danger'
            App.trigger 'host:updated', opts
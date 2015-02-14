module.exports = (App, controller, options) =>
    options.model.destroy
        success: (__host__) =>
            hostName = __host__.get 'host'
            options =
                message: hostName + ' host deleted. Please publish PAC files.'
                icon: 'glyphicon glyphicon-exclamation-sign'
                type: 'danger'
            App.trigger 'host:updated', options

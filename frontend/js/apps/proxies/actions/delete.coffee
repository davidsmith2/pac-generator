module.exports = (App, controller, options) =>
    options.model.destroy
        success: (__proxy__) =>
            proxyName = __proxy__.get 'name'
            options = 
                message: proxyName + ' proxy deleted.'
                icon: 'glyphicon glyphicon-exclamation-sign'
                type: 'danger'
            App.ProxiesApp.trigger 'proxy:updated', options

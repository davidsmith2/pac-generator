module.exports = (App, controller, options) =>
    host = options.model
    host.save host.attributes, 
        success: (__host__) =>
            hostName = __host__.get 'host'
            action = if __host__.get 'active' then 'activated' else 'deactivated'
            opts =
                options:
                    message: hostName + ' host ' + action + '. Please publish PAC files.'
            App.trigger 'host:updated', opts
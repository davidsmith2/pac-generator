module.exports = (App, controller, options) =>
    options.model.destroy
        success: (host) =>
            console.log 'host ' + host.get('_id') + ' destroyed'
            App.trigger 'proxies:updated'

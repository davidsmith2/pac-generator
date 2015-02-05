module.exports = (App, controller, options) =>
    options.model.destroy
        success: (proxy) =>
            console.log 'proxy ' + proxy.get('_id') + ' destroyed'

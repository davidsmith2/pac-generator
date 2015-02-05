module.exports = (App, controller, options) =>
    options.model.destroy
        success: (proxy) =>
            console.log 'proxy ' + options.model.get '_id' + ' destroyed'

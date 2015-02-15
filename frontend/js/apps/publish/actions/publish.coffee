module.exports = (App, controller, options) =>
    options.collection.publish
        success: () =>
            opts = 
                options:
                    message: 'PAC files published for all proxies.'
                    icon: 'glyphicon glyphicon-ok'
                settings:
                    type: 'success'
            controller.notify opts
        error: () =>
            console.log('error publishing PAC files')

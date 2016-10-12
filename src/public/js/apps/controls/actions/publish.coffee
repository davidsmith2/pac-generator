module.exports = (App, controller, options) =>
    controller.collections.proxies.publish
        success: () =>
            opts = 
                options:
                    message: 'PAC files published for all proxies.'
                    icon: 'glyphicon glyphicon-ok'
                settings:
                    type: 'success'
            controller.notify opts
        error: () =>
            console.log('Error publishing PAC files')

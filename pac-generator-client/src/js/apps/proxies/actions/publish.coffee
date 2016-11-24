module.exports = (App, controller, view) =>
    view.model.publish
        success: (response) =>
            opts =
                options:
                    message: 'PAC file published for ' + view.model.get('name') + ' proxy.'
                    icon: 'glyphicon glyphicon-ok'
                settings:
                    type: 'success'
            controller.notify opts
            view.disablePublishing()
            if !view.model.get 'href'
                view.model.setHref response._id
                view.model.save {href: view.model.get 'href'},
                success: (__proxy__) =>
                    proxyName = __proxy__.get 'name'
                    opts =
                        options:
                            message: proxyName + ' proxy URL saved'
                    controller.notify opts
        error: () =>
            console.log('error publishing PAC file')

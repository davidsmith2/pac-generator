var Backbone = require('backbone');

var FormView = require('../../../common/views/form');
var ModalView = require('../../../common/views/modal');
var Proxy = require('../../../entities/proxy');

module.exports = function (App, controller) {
    var formView = new FormView({
        model: new Proxy(),
        template: require('../views/templates/form.hbs')
    });
    var modalView = new ModalView({
        model: new Backbone.Model({title: 'Create proxy'})
    });
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    modalView.on('save', formView.save, formView);
    controller.listenTo(formView, 'saved', function (proxy) {
        this.collection.create(proxy.attributes, {
            success: function (__proxy__) {
                console.log('proxy ' + __proxy__.get('_id') + ' created');
            }
        });
    });
};

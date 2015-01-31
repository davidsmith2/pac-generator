var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');

var ProxyModel = require('../entities/proxy');
var ProxiesView = require('../views/proxies');
var ProxyFormView = require('../views/proxyForm');
var ModalView = require('../views/modal');
var AlertView = require('../views/alert');
var ProxyPublishView = require('../views/proxyPublish');

module.exports = function (App) {
    return Marionette.Controller.extend({
        initialize: function (options) {
            this.collection = options.collection;
        },
        index: function () {
            var self = this;
            self.collection.fetch({
                success: function (proxies) {
                    var proxiesView = new ProxiesView({
                        collection: proxies
                    });
                    proxiesView.on('create', self.create, self);
                    proxiesView.on('publish', self.publishAll, self);
                    proxiesView.on('childview:publish', self.publish, self);
                    proxiesView.on('childview:copy', self.copy, self);
                    proxiesView.on('childview:edit', self.edit, self);
                    proxiesView.on('childview:delete', self['delete'], self);
                    App.proxiesRegion.show(proxiesView);
                }
            });
        },
        create: function () {
            var self = this;
            var proxyModel = new ProxyModel();
            var proxyFormView = new ProxyFormView({model: proxyModel});
            var modalView = new ModalView({model: new Backbone.Model({title: 'Create proxy'})});
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(proxyFormView);
            self.listenTo(modalView, 'save', function () {
                var data = {};
                data.name = proxyFormView.$el.find('[name=name]').val();
                data.server = proxyFormView.$el.find('[name=server]').val();
                data.port = proxyFormView.$el.find('[name=port]').val();
                proxyModel.set(data);
                self.collection.create(proxyModel.attributes, {
                    success: function (model) {
                        console.log('proxy ' + model.get('_id') + ' created');
                    }
                });
            });
        },
        publishAll: function (options) {
            options.collection.publish();
        },
        publish: function (options) {
            var alertView = new AlertView();
            options.model.publish({
                success: function (response) {
                    alertView.on('before:render', function () {
                        this.$el.addClass('alert-success');
                    });
                    alertView.on('render', function () {
                        this.contentRegion.show(new ProxyPublishView({model: new Backbone.Model(response)}));
                    });
                    App.alertRegion.show(alertView);
                },
                error: function () {
                    console.log('here');
                }
            });
        },
        copy: function (options) {
            console.log('copy', options);
        },
        edit: function (options) {
            var self = this;
            var proxyFormView = new ProxyFormView({model: options.model});
            var modalView = new ModalView({model: new Backbone.Model({title: 'Edit proxy'})});
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(proxyFormView);
            self.listenTo(modalView, 'save', function () {
                var data = {};
                data.name = proxyFormView.$el.find('[name=name]').val();
                data.server = proxyFormView.$el.find('[name=server]').val();
                data.port = proxyFormView.$el.find('[name=port]').val();
                options.model.save(data, {
                    success: function (model) {
                        console.log('proxy ' + model.get('_id') + ' edited');
                    }
                });
            });
        },
        delete: function (options) {
            var id = options.model.get('_id');
            options.model.destroy({
                success: function (model) {
                    console.log('proxy ' + id + ' destroyed');
                }
            });
        }
    });
};

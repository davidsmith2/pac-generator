var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');

var HostsView = require('../views/hosts');
var HostFormView = require('../views/hostForm');
var HostsView = require('../views/hosts');
var ModalView = require('../views/modal');

module.exports = function (App) {
    var Controller = Marionette.Controller.extend({
        initialize: function (options) {
            var self = this;
            self.collection = options.collection;
            self.Model = options.Model;
            self.region = options.region;
            self.compositeViewTitle = options.compositeViewTitle;
            self.modalTitles = options.modalTitles;
        },
        index: function () {
            var self = this;
            self.collection.fetch({
                success: function (collection) {
                    var hostsView = new HostsView({collection: collection});
                    hostsView.on('render', function () {
                        this.$('h2').html(self.compositeViewTitle);
                    });
                    hostsView.on('create', self.create, self);
                    hostsView.on('childview:edit', self.edit, self);
                    hostsView.on('childview:delete', self['delete'], self);
                    self.region.show(hostsView);
                }
            });
        },
        create: function () {
            var self = this;
            var hostModel = new self.Model();
            var hostFormView = new HostFormView({model: hostModel});
            var modalView = new ModalView({model: new Backbone.Model({title: self.modalTitles.create})});
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(hostFormView);
            self.listenTo(modalView, 'save', function () {
                var host = hostFormView.$el.find('[name=host]').val();
                hostModel.set('host', host);
                self.collection.create(hostModel.attributes, {
                    success: function (model) {
                        console.log('host ' + model.get('_id') + ' created');
                    }
                });
            });
        },
        edit: function (options) {
            var self = this;
            var hostFormView = new HostFormView({model: options.model});
            var modalView = new ModalView({model: new Backbone.Model({title: self.modalTitles.edit})});
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(hostFormView);
            self.listenTo(modalView, 'save', function () {
                var host = hostFormView.$el.find('[name=host]').val();
                options.model.save({host: host}, {
                    success: function (model) {
                        console.log('host ' + model.get('_id') + ' edited');
                    }
                });
            });
        },
        delete: function (options) {
            var id = options.model.get('_id');
            options.model.destroy({
                success: function (model) {
                    console.log('host ' + id + ' destroyed');
                }
            });
        }
    });
    return Controller;
};

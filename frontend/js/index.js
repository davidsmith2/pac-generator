(function ($, _, Backbone, Marionette) {

    var Exception = Backbone.RelationalModel.extend({
        urlRoot: '/api/exceptions',
        idAttribute: '_id',
        defaults: {
            host: ''
        }
    });

    var Exceptions = Backbone.Collection.extend({
        url: '/api/exceptions',
        model: Exception,
        comparator: 'host'
    });

    var Rule = Backbone.RelationalModel.extend({
        idAttribute: '_id',
        defaults: {
            host: ''
        }
    });

    var Rules = Backbone.Collection.extend({
        url: '/api/rules',
        model: Rule,
        comparator: 'host'
    });

    var Proxy = Backbone.RelationalModel.extend({
        idAttribute: '_id',
        defaults: {
            name: '',
            port: '',
            exceptions: [],
            rules: []
        },
        relations: [
            {
                type: Backbone.HasMany,
                key: 'exceptions',
                relatedModel: Exception,
                collectionType: Exceptions,
                reverseRelation: {
                    key: 'proxy',
                    includeInJSON: '_id'
                }
            },
            {
                type: Backbone.HasMany,
                key: 'rules',
                relatedModel: Rule,
                collectionType: Rules,
                reverseRelation: {
                    key: 'proxy',
                    includeInJSON: '_id'
                }
            }
        ],
        download: function () {
            var url = this.url() + '/download';
            var options = {
                url: url,
                type: 'get'
            };
            return (this.sync || Backbone.sync).call(this, null, this, options);
        }
    });

    var Proxies = Backbone.Collection.extend({
        url: '/api/proxies',
        model: Proxy,
        comparator: 'name',
        download: function () {
            this.each(function (proxy) {
                proxy.download();
            });
        }
    });

    var ModalView = Marionette.LayoutView.extend({
        template: _.template($('#modal-template').html()),
        className: 'modal',
        regions: {
            headerRegion: '.modal-header',
            bodyRegion: '.modal-body',
            footerRegion: '.modal-footer'
        },
        events: {
            'click .btn-primary': 'save'
        },
        initialize: function () {
            this.$el.modal();
        },
        onRender: function () {
            this.$el.modal('show');
        },
        save: function () {
            this.$el.modal('hide');
            this.trigger('save');
        }
    });

    var HostFormView = Marionette.ItemView.extend({
        template: _.template($('.host-form-template').html()),
        tagName: 'form',
        className: 'form-horizontal'
    });

    var HostView = Marionette.ItemView.extend({
        template: _.template($('.host-template').html()),
        tagName: 'tr',
        triggers: {
            'click .js-edit': 'edit',
            'click .js-delete': 'delete'
        },
        modelEvents: {
            'change:host': 'hostChanged'
        },
        hostChanged: function () {
            this.render();
        }
    });

    var HostsView = Marionette.CompositeView.extend({
        template: _.template($('.hosts-template').html()),
        childView: HostView,
        childViewContainer: 'table',
        triggers: {
            'click .js-create': 'create'
        }
    });

    var HostController = Marionette.Controller.extend({
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

    var ProxyFormView = Marionette.ItemView.extend({
        template: _.template($('.proxy-form-template').html()),
        tagName: 'form',
        className: 'form-horizontal'
    });

    var ProxyView = Marionette.ItemView.extend({
        template: _.template($('#proxy-template').html()),
        tagName: 'tr',
        triggers: {
            'click .js-copy': 'copy',
            'click .js-download': 'download',
            'click .js-edit': 'edit',
            'click .js-delete': 'delete'
        },
        modelEvents: {
            'change': 'changed'
        },
        changed: function () {
            this.render();
        }
    });

    var ProxiesView = Marionette.CompositeView.extend({
        template: _.template($('#proxies-template').html()),
        childView: ProxyView,
        childViewContainer: 'table',
        triggers: {
            'click .js-create': 'create',
            'click .js-download': 'download'
        }
    });

    var ProxyController = Marionette.Controller.extend({
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
                    proxiesView.on('download', self.downloadAll, self);
                    proxiesView.on('childview:copy', self.copy, self);
                    proxiesView.on('childview:download', self.download, self);
                    proxiesView.on('childview:edit', self.edit, self);
                    proxiesView.on('childview:delete', self['delete'], self);
                    App.proxiesRegion.show(proxiesView);
                }
            });
        },
        create: function () {
            var self = this;
            var proxyModel = new Proxy();
            var proxyFormView = new ProxyFormView({model: proxyModel});
            var modalView = new ModalView({model: new Backbone.Model({title: 'Create proxy'})});
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(proxyFormView);
            self.listenTo(modalView, 'save', function () {
                var name = proxyFormView.$el.find('[name=name]').val();
                var port = proxyFormView.$el.find('[name=port]').val();
                proxyModel.set({name: name, port: port});
                self.collection.create(proxyModel.attributes, {
                    success: function (model) {
                        console.log('proxy ' + model.get('_id') + ' created');
                    }
                });
            });
        },
        downloadAll: function (options) {
            options.collection.download();
        },
        copy: function (options) {
            console.log('copy', options)
        },
        download: function (options) {
            options.model.download();
        },
        edit: function (options) {
            console.log('edit', options)
            var self = this;
            var proxyFormView = new ProxyFormView({model: options.model});
            var modalView = new ModalView({model: new Backbone.Model({title: 'Edit proxy'})});
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(proxyFormView);
            self.listenTo(modalView, 'save', function () {
                var name = proxyFormView.$el.find('[name=name]').val();
                var port = proxyFormView.$el.find('[name=port]').val();
                options.model.save({name: name, port: port}, {
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

    var App = new Marionette.Application();

    App.addRegions({
        proxiesRegion: '#proxies-region',
        exceptionsRegion: '#exceptions-region',
        rulesRegion: '#rules-region',
        modalRegion: '#modal-region'
    });

    App.addInitializer(function () {

        // exceptions
        var exceptionController = new HostController({
            collection: new Exceptions(),
            Model: Exception,
            region: App.exceptionsRegion,
            compositeViewTitle: 'Exceptions',
            modalTitles: {
                create: 'Create exception',
                edit: 'Edit exception'
            }
        });
        exceptionController.index();

        // rules
        var ruleController = new HostController({
            collection: new Rules(),
            Model: Rule,
            region: App.rulesRegion,
            compositeViewTitle: 'Rules',
            modalTitles: {
                create: 'Create rule',
                edit: 'Edit rule'
            }
        });
        ruleController.index();

        // proxies
        var proxyController = new ProxyController({
            collection: new Proxies()
        });
        proxyController.index();

    });

    App.start();

    App.on('start', function () {
        Backbone.history.start();
    });

}(jQuery, _, Backbone, Marionette));

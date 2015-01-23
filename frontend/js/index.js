(function ($, _, Backbone, Marionette) {

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
                relatedModel: Exception
            },
            {
                type: Backbone.HasMany,
                key: 'rules',
                relatedModel: Rule
            }
        ]
    });

    var Proxies = Backbone.Collection.extend({
        url: '/api/proxies',
        model: Proxy,
        comparator: 'name'
    });

    var Exception = Backbone.RelationalModel.extend({
        urlRoot: '/api/exceptions',
        idAttribute: '_id',
        defaults: {
            host: ''
        }
    });

    var Exceptions = Backbone.Collection.extend({
        url: '/api/exceptions',
        model: Exception
    });

    var Rule = Backbone.RelationalModel.extend({
        idAttribute: '_id',
        defaults: {
            host: ''
        }
    });

    var Rules = Backbone.Collection.extend({
        url: '/api/rules',
        model: Rule
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
        className: 'form-horizontal',
        triggers: {
            'submit': 'submit'
        }
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

    var ProxyView = Marionette.ItemView.extend({
        template: _.template($('#proxy-template').html()),
        tagName: 'tr'
    });

    var ProxiesView = Marionette.CompositeView.extend({
        template: _.template($('#proxies-template').html()),
        childView: ProxyView,
        childViewContainer: 'table'
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
        var proxies = new Proxies();
        proxies.fetch({
            success: function (proxies) {
                var proxiesView = new ProxiesView({
                    collection: proxies
                });
                App.proxiesRegion.show(proxiesView);
            }
        });

    });

    App.start();

    App.on('start', function () {
        Backbone.history.start();
    });

}(jQuery, _, Backbone, Marionette));

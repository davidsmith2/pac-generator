var libs = [
    'backbone',
    'backbone-relational',
    'backbone.marionette',
    'bootstrap',
    'handlebars',
    'jquery',
    'underscore'
];

module.exports = {
    libs: {
        src: [],
        dest: './dist/js/libs.js',
        options: {
            external: null,
            require: libs
        }
    },
    app: {
        src: ['./src/js/app.coffee'],
        dest: './dist/js/app.js',
        options: {
            browserifyOptions: {
                debug: true,
                extensions: ['.coffee']
            },
            external: libs,
            transform: [
                'browserify-shim',
                'coffeeify',
                'hbsfy'
            ]
        }
    }
};

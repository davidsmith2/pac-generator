module.exports = {
    backend: {
        files: [
            'app.js',
            'backend/**/*.jade',
            'backend/**/*.js',
            'config/**/*.js'
        ],
        tasks: ['express:web'],
        options: {
            atBegin: true,
            spawn: false
        }
    },
    css: {
        files: [
            'frontend/css/*.less',
            'frontend/css/**/*.less'
        ],
        tasks: ['less']
    },
    html: {
        files: [
            'frontend/js/**/*.hbs'
        ],
        tasks: ['bootlint']
    },
    livereload: {
        files: [
            'build/css/**/*',
            'build/js/**/*'
        ],
        options: {
            livereload: true
        }
    },
};
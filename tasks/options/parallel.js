module.exports = {
    web: {
        options: {
            stream: true
        },
        tasks: [
            {
                grunt: true,
                args: ['watch:css']
            },
            {
                grunt: true,
                args: ['watch:js']
            },
            {
                grunt: true,
                args: ['watch:livereload']
            },
            {
                grunt: true,
                args: ['watch:backend']
            }
        ]
    }
};
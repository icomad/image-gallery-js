module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
           content: ['./src/**/*.*', '../webapp/index.html', '../webapp/app.html'],
           defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        }),
        require('cssnano')({
            preset: 'default'
        })
    ]
};
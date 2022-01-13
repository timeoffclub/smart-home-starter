const purgecss = require('@fullhuman/postcss-purgecss')
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        purgecss: {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
}

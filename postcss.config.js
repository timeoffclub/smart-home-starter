module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        purgecss: {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
}

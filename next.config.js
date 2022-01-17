const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
    images: {
        domains: ['localhost', 'shsprods.wpengine.com', 'i0.wp.com'],
    }
})
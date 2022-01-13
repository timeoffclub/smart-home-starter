const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: 'default-src'
    }
]

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'shsprods.wpengine.com'],
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    },
})

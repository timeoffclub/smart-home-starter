
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'shsprods.wpengine.com', 'i0.wp.com'],
    },
    async redirects() {
        return [
            {
                source: '/ads.txt',
                destination: 'ads.adthrive.com/sites/6164a6ff014ece4bc4e34c23/ads.txt',
                statusCode: 301,
            }
        ]
    }
}


webpack: (config, options) => {
    // Generate disallow all robots.txt and add to /public folder in preview
    if (options.isServer && process.env.VERCEL_ENV === 'preview') {
      require('./scripts/generate-robotstxt-preview.js');
    }
}
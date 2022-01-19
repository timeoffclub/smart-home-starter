
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'shsprods.wpengine.com', 'i0.wp.com'],
    }
}


webpack: (config, options) => {
    // Generate disallow all robots.txt and add to /public folder in preview
    if (options.isServer && process.env.VERCEL_ENV === 'preview') {
      require('./scripts/generate-robotstxt-preview.js');
    }
}
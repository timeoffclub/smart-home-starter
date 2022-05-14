const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        domains: ['localhost', 'shsprods.wpengine.com', 'shsstag.wpengine.com', 'm.media-amazon.com'],
    },
    async redirects() {
        return [
            {
                source: '/ads.txt',
                destination: 'https://ads.adthrive.com/sites/6164a6ff014ece4bc4e34c23/ads.txt',
                statusCode: 301,
                basePath: false
            },
            {
                source: '/adt/:slug*',
                destination: '/',
                permanent: false
            },
            {
                source: '/buyer-guide/:slug*',
                destination: '/',
                permanent: false
            },
            {
                source: '/recommendations/:slug*',
                destination: '/',
                permanent: false
            }
        ]
    },
    webpack: (config, options) => {
        // Generate disallow all robots.txt and add to /public folder in preview
        if (options.isServer && process.env.VERCEL_ENV === 'preview') {
          require('./scripts/generate-robotstxt-preview.js');
        }
        return config
    }
}

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore
    
    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
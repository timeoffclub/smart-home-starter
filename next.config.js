const withPlugins = require('next-compose-plugins')
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { withSentryConfig } = require('@sentry/nextjs')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

  module.exports = ([
      [
        withBundleAnalyzer, {
            reactStrictMode: true,
            images: {
                domains: ['localhost', 'shsprods.wpengine.com'],
            }
        }
      ],
      [
        withSentryConfig, {
            silent: true
        }
      ]
  ])

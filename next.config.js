const withMDX = require('@next/mdx')()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  env: {
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
  async redirects() {
    return [
      {
        source: '/audio',
        destination: '/audio/esv/Amy',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // disable a default plugin
                      removeViewBox: false,

                      // customize the params of a default plugin
                      inlineStyles: {
                        onlyMatchedOnce: false,
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

module.exports = withMDX(nextConfig)

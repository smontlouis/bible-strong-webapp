const withPlugins = require('next-compose-plugins')
const svg = require('next-react-svg')
const images = require('next-images')

const path = require('path')

const nextConfig = {
  env: {
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
}

module.exports = withPlugins([
  [
    svg,
    {
      include: path.resolve(__dirname, 'images/svg'),
    },
  ],
  [
    images,
    {
      exclude: path.resolve(__dirname, 'images/svg'),
    },
  ],
  nextConfig,
])

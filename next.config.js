
const withCSS = require("@zeit/next-css");
const { withPlugins } = require('next-compose-plugins');
if (!process.env.GQL_URL) {
  require("dotenv").config()
}

const nextConfig = {
  env: {
    gql_url: process.env.GQL_URL || 'http://localhost:4444',
    gql_ws_url: process.env.GQL_WS_URL || 'ws://localhost:4444'
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    return config;
  }
}
module.exports = withPlugins([
  withCSS,
  nextConfig,
])
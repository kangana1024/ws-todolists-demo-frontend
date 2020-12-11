const plugins = {
  tailwindcss: {},
  autoprefixer: {},
}
if (process.env.NODE_ENV === 'production') {
  // This doesn't seem to work. None of the css is purged...
  plugins['@fullhuman/postcss-purgecss'] = {
    layers: ['utilities', 'base', 'components'],
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  }
}

module.exports = {
  plugins
}

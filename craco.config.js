
module.exports = {
  eslint: {
    enable: false
  },
  typescript: {
    enableTypeChecking: false
  },
  plugins: [{
      plugin: require('craco-plugin-scoped-css')
  }]
}

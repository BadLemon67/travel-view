module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    https: false,
    open: true,
    overlay: {
      warning: false,
      errors: true
    },
    proxy: null
  }
}

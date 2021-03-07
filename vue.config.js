module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8085,
    open: true,
    overlay: {
      warning: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://192.168.1.11:8086/webserver',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

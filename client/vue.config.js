const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, '../src/public'),
  devServer:{
    proxy: {
      '/api': {
        target: 'http://localhost:4000'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}

// module.exports = {
//   publicPath : './'
// }

module.exports = {
  devServer: {
      // proxy: process.env.VUE_APP_BASE_API // http://43.202.166.221:3000
      proxy: 'https://13.124.62.68:3000'
      // ,https: true
      // ,secure: false,
      // changeOrigin: true,
    }
}

// secure: false,
// changeOrigin: true,
module.exports = {
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    if (process.env.NODE_ENV === 'production') {
      config.entryPoints.clear()
    }
    if (process.env.use_analyzer) {     // 分析
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      index: './src/blocks/h5/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //     minSize: 100000,
    //     cacheGroups: {
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         filename: "vendors.js"
    //       },
    //       default: false
    //     }
        
    //   }
    // }
  },
  filenameHashing: false
}


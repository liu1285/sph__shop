const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({ 
  publicPath: './',
  // 关闭map
  productionSourceMap:false,
  // 关闭eslint
  lintOnSave:false,
  devServer: {
      proxy: {
        "/api": {
          target: "http://gmall-h5-api.atguigu.cn",
        }
      },
      hot:true
  },
})

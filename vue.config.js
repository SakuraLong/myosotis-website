const { defineConfig } = require('@vue/cli-service')
// const path = require('path') //引入path模块 npm install path
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('sakura-renderer', resolve('src/sakura-renderer'))
  // },
  // publicPath: './'
})

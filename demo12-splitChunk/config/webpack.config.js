const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", // 开发模式
  // web server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist"), // 打包后的文件路径
    },
    hot: true,
    open: true, //自动打开浏览器
    compress: true, //启动gzip压缩
    port: 9000, // 端口号
  },
  // 入口文件
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    clean: true, // 清理 /dist 文件夹
    filename: "[name].bundle.js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 设置为all, chunk可以在异步和非异步chunk之间共享; async 代码分割时对异步代码生效; inital：同步代码有效
      minSize: 20000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      minRemainingSize: 0, 
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 按需加载时的最大并行请求数
      maxInitialRequests: 4, // 入口点的最大并行请求数
      automaticNameDelimiter: '~', // 文件生成时的连接符
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 位于node_modules中的模块做代码分割
          priority: -10, // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
          reuseExistingChunk: true,
        }, // 分割，，既满足 vendors，又满足 default，那么根据优先级会打包到 vendors 组中。
        default: { // 没有 test 表明所有的模块都能进入 default 组，但是注意它的优先级较低。
          minChunks: 2,
          priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
          reuseExistingChunk: true // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
        }
      }
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'index.html',
      chunks:['index'] 
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'search.html',
      chunks:['search'] // 与入口文件对应的模块名
    })
  ],
};

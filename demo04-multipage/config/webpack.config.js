const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", // 开发模式
  // 入口文件
  entry: {
    main: path.resolve(__dirname,'../src/index.js'),
    search: path.resolve(__dirname,'../src/search.js')
  }, 
  // web server
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'), // 打包后的文件路径
    },
    open: true,    //自动打开浏览器
    compress: true,  //启动gzip压缩
    port: 9000   // 端口号
  },
  output: {
    filename: "[name].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'index.html',
      chunks:['main'] 
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'search.html',
      chunks:['search'] // 与入口文件对应的模块名
    })
  ]
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", // 开发模式
  entry: path.resolve(__dirname,'../src/index.js'),  // 入口文件
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
    filename: "main.js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    })
  ]
};

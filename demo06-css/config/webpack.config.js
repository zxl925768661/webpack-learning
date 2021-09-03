const path = require("path");
const { getMultiPageConfig } = require("../getMultiPageConfig");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { entries, htmlPlugins } = getMultiPageConfig();
module.exports = {
  mode: "development", // 开发模式
  // 入口文件
  entry: entries,
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
  plugins: [new CleanWebpackPlugin()].concat(htmlPlugins),
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader'] // 从右向左解析原则
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader'] // less的loader
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader'] // scss的loader
      }
    ]
  }
};

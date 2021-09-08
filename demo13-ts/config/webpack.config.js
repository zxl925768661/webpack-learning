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
  entry: path.resolve(__dirname,'../src/index.ts'),  // 入口文件
  output: {
    clean: true, // 清理 /dist 文件夹
    filename: "[name].bundle.js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    })
  ],
};

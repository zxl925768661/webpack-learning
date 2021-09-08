const path = require("path");
const { getMultiPageConfig } = require("../getMultiPageConfig");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const { entries, htmlPlugins } = getMultiPageConfig();
module.exports = {
  mode: "development", // 开发模式
  // web server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist"), // 打包后的文件路径
    },
    open: true, //自动打开浏览器
    compress: true, //启动gzip压缩
    port: 9000, // 端口号
  },
  // 入口文件
  entry: entries,
  output: {
    clean: true,  // 清理 /dist 文件夹
    filename: "[name].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ]
  }
};

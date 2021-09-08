const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 开发模式
  entry: path.resolve(__dirname, "../src/index.ts"), // 入口文件
  // web server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist"), // 打包后的文件路径
    },
    open: true, //自动打开浏览器
    compress: true, //启动gzip压缩
    port: 9000, // 端口号
  },
  output: {
    clean: true, // 清理 /dist 文件夹
    filename: "main.js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: { appendTsxSuffixTo: [/\.vue$/] }
          }
        ]
     },
    ],
  },
  // 配置模块如何解析
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",    // 末尾添加 $，以表示精准匹配
      " @": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".json", ".vue", '.ts', '.tsx',],  // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
  }
};

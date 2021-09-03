const path = require("path");
const { getMultiPageConfig } = require("../getMultiPageConfig");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { entries, htmlPlugins } = getMultiPageConfig();
module.exports = {
  mode: "development", // 开发模式
  // web server
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'), // 打包后的文件路径
    },
    open: true,    //自动打开浏览器
    compress: true,  //启动gzip压缩
    port: 9000   // 端口号
  },
  // 入口文件
  entry: entries,
  output: {
    filename: "[name].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 8, // // 将小于8KB的图片转换成base64的格式
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]", // 文件名.hash.文件扩展名 默认格式为[hash].[ext]
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [{
          loader: 'file-loader',
          options: {
            name: 'media/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          "less-loader",
        ], // 从右向左解析原则
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ], // scss的loader
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            // 按需加载，且不需要手动引入 @babel/polyfill
            presets:[
              ['@babel/preset-env', {
                "useBuiltIns": "usage",
                "debug": true
              }]
            ],
            // presets:['@babel/preset-env']
          },
        },
        exclude: /node_modules/
      },
    ]
  }
};

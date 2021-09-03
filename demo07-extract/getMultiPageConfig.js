const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

exports.getMultiPageConfig = function () {
  const entries = {}, htmlPlugins = [];
  // glob同步方法获取
  const entryFiles = glob.sync(path.resolve(__dirname, "./src/js/*/index.js"));
  // ['/xxx/demo05-glob-multpage/src/js/index/index.js', '/xxx/demo05-glob-multpage/src/js/search/index.js']
  entryFiles.forEach((ele) => {
    let match = ele.match(/src\/js\/(.*)\/index\.js/);
    let pageName = match && match[1];
    if (pageName) {
      entries[pageName] = ele;
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "./public/index.html"),
          filename: `${pageName}.html`,
          chunks: [pageName],
        })
      );
    }
  });
  return {
    entries,
    htmlPlugins,
  };
};

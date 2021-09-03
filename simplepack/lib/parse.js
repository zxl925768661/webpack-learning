const fs = require("fs");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");

module.exports = {
  // 生成AST
  getAST: (path) => {
    // 读取文件内容
    const source = fs.readFileSync(path, "utf-8");

    return babylon.parse(source, {
      sourceType: "module",
    });
  },
  // 对AST节点进行递归遍历， 获取模块的依赖属性
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },
  // 将获得的ES6的AST转化成ES5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  },
};

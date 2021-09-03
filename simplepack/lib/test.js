const path = require("path");
const { getAST, getDependencies, transform } = require("./parse");

const ast = getAST(path.join(__dirname, "../src/index.js"));
console.log(ast);

const dependencies = getDependencies(ast);
console.log(dependencies);

const source = transform(ast);
console.log(source);

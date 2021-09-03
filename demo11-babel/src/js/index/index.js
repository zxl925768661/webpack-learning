// import "@babel/polyfill"
import { greeting } from "./greeting.js";
import "../../assets/index.css";
import "../../assets/index.less";
import "../../assets/index.scss";
// 在js中使用图片
import test from "../../assets/test.jpg";
import test1 from "../../assets/test1.jpg";

import movie from "../../assets/movie.ogg";
document.getElementById("title").textContent = greeting("world!");

let img = new Image();
img.src = test;
document.getElementById("testImg").appendChild(img);

let img1 = new Image();
img1.src = test1;
document.getElementById("testImg").appendChild(img1);

let videoDom = document.createElement("video");
videoDom.src = movie;
videoDom.controls = "controls";
document.getElementById("testMedia").appendChild(videoDom);

// 箭头函数
let arrowFn = () => console.log("hello babel");
arrowFn();
// 解构赋值
let arr = [1, 2, 3];
let [a, b, c] = arr;
// 拓展运算符
console.log(...arr);
//
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x));

for (let i of s) {
  console.log(i);
}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "done");
  });
}

timeout(100).then((value) => {
  console.log(value);
});

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint("hello world", 50);

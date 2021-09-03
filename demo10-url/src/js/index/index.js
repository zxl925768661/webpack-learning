import { greeting } from "./greeting.js";
import '../../assets/index.css';
import '../../assets/index.less';
import '../../assets/index.scss';
// 在js中使用图片
import test from "../../assets/test.jpg";
import test1 from "../../assets/test1.jpg";

import movie from "../../assets/movie.ogg";
document.getElementById('title').textContent = greeting("world!");

let img = new Image();
img.src = test;
document.getElementById("testImg").appendChild(img);

let img1 = new Image();
img1.src = test1;
document.getElementById("testImg").appendChild(img1);

let videoDom = document.createElement("video");
videoDom.src = movie;
videoDom.controls = "controls"
document.getElementById("testMedia").appendChild(videoDom);


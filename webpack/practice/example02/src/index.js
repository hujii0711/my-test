import { hello, add } from "./utils";
import "./style.css";
import "./header.css";
import logo from "./image/test.png";
import logo2 from "./image/20221227_151033.png";

const text = hello("<p>나는 코딩앙마~~</p>");
const num = add(1, 2);
const img = `<img src="${logo}" alt="코딩앙마" />`;
const img2 = `<img src="${logo2}" alt=503" />`;
const arrowFunc = () => 1 + 1;
document.getElementById("root").innerHTML = img + img2 + text + num;

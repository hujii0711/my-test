import { hello, add } from "./utils";
import "./style.css";
import "./header.css";
import logo from "./image/test.png";

const text = hello("<p>나는 코딩앙마~~</p>");
const num = add(1, 2);
const img = `<img src="${logo}" alt="코딩앙마" />`;
document.getElementById("root").innerHTML = img + text + num;

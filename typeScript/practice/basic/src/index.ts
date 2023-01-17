import { testMakePerson } from "./utils/makePerson";

const button = document.getElementById("button");

button.addEventListener("click", () => {
  console.log("111111====", testMakePerson());
  alert("clicked!");
});

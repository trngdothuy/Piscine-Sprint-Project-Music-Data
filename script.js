import { countUsers } from "./common.js";

window.onload = function () {
  document.querySelector("body").innerText = `There are ${countUsers()} users`;
};
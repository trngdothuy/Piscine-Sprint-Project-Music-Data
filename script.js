import { countUsers } from "./common.js";

const userSelector = document.getElementById("user-selector")

function render() {
  for (let i = 0; i < countUsers(); i++) {
    let option = document.createElement("option")
    option.value = i;
    option.innerHTML = `User ${i}`
    userSelector.append(option)
  }
};

render()
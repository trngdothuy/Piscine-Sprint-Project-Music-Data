import { countUsers, getMostListenedSongCount } from "./common.js";

const userSelector = document.getElementById("user-selector")

const questions = ["Most listened song (count)", 
    "Most listened song (time)", 
    "Most listened artist (count)",
    "Most listened artist (time)",
    "Friday night song (count)",
    "Friday night song (time)",
    "Longest streak song",
    "Every day songs",
    "Top three genres",];

let state = {
    "userId": "1",
    "userData": {},
}

function makeSelectorBar() {
  for (let i = 0; i < countUsers(); i++) {
    let option = document.createElement("option")
    option.value = i;
    option.innerHTML = `User ${i}`
    userSelector.append(option)
  }
};

makeSelectorBar()

userSelector.addEventListener("change", (e) => {
  e.preventDefault()
  console.log(e.target.value, "userSelector clicked")
  // update state.userId = e.target.value
})

state.userData[questions[0]] = getMostListenedSongCount(state.userId)

console.log(state)

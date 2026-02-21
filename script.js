import { countUsers, getMostListenedSongCount, getMostListenedSongTime, getMostListenedArtistCount } from "./common.js";

const userSelector = document.getElementById("user-selector")
const userId = document.querySelector("h2")
const userDataDiv = document.getElementById("user-data")

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
    "userData": [],
}

// update state
state.userData.push([
  [questions[0]], getMostListenedSongCount(state.userId)
])
state.userData.push([
  [questions[1]], getMostListenedSongTime(state.userId)
])
state.userData.push([
  [questions[2]], getMostListenedArtistCount(state.userId)
])

console.log("state", state)

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
  // update state.userId = e.target.value for multi users
})

// render
function render() {
 userId.innerHTML = `User ${state.userId} Listening History`

 if (state.userData.length === 0) {
  userDataDiv.innerText = "This user has no listening history"
 } else {
  for (let i = 0; i < state.userData.length; i++) {
    if (state.userData[i][1].length == 0) {
      
    } else {
      const div = document.createElement("div")
    div.className = "questionDiv"

    const questionP = document.createElement("p")
    questionP.className = "question-p"
    questionP.innerHTML = `${state.userData[i][0]}:` 

    const answerP = document.createElement("p")
    answerP.className = "answer-p"
    answerP.innerHTML = `${state.userData[i][1]}`

    div.append(questionP, answerP)
    userDataDiv.append(div)
    }
  }
 }
}

render()

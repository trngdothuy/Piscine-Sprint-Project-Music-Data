import { countUsers, getMostListenedSongCount } from "./common.js";

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

// update state
state.userData.push([
  [questions[0]], getMostListenedSongCount(state.userId)
])

console.log(state)

// render
function render() {
 userId.innerHTML = `User ${state.userId} Listening History`

 state.userData.forEach((question) => {
  console.log(question[0])

  const div = document.createElement("div")
  div.className = "questionDiv"

  const questionP = document.createElement("p")
  questionP.className = "question-p"
  questionP.innerHTML = `${question[0]}:` 

  const answerP = document.createElement("p")
  answerP.className = "answer-p"
  answerP.innerHTML = `${question[1].artist} - ${question[1].title}`

  div.append(questionP, answerP)
  userDataDiv.append(div)
 }) 
}

render()

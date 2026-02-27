import { countUsers, getMostListenedSongCount, getMostListenedSongTime, getMostListenedArtistCount, getMostListenedArtistTime, getMostListenedSongFridayNightCount, getMostListenedSongFridayNightTime, getMostStreakSong, getSongListenedEveryDay, getTopGenres } from "./common.js";

const userSelector = document.getElementById("user-selector")
const userIdText = document.querySelector("h2")
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
function updateState(userId) {
  state.userData.push([
    [questions[0]], getMostListenedSongCount(userId)
  ]);
  state.userData.push([
    [questions[1]], getMostListenedSongTime(userId)
  ]);
  state.userData.push([
    [questions[2]], getMostListenedArtistCount(userId)
  ]);
  state.userData.push([
    [questions[3]], getMostListenedArtistTime(userId)
  ]);
  state.userData.push([
    [questions[4]], getMostListenedSongFridayNightCount(userId)
  ]);
  state.userData.push([
    [questions[5]], getMostListenedSongFridayNightTime(userId)
  ]);
  state.userData.push([
    [questions[6]], getMostStreakSong(userId)
  ]);
  state.userData.push([
    [questions[7]], getSongListenedEveryDay(userId).join(", ")
  ]);

  if (getTopGenres(userId).length > 1) {
    state.userData.push([
    `Top ${getTopGenres(userId).length} genres`, getTopGenres(userId).join(", ")
  ]);
  } else {
    state.userData.push([
    "Top genre", getTopGenres(userId)
  ]);
  }
  console.log("state", state)
}


function makeSelectorBar() {
  for (let i = 1; i <= countUsers(); i++) {
    let option = document.createElement("option")
    option.value = i;
    option.innerHTML = `User ${i}`
    userSelector.append(option)
  }
};

makeSelectorBar()

// listen to the change in the user selector, then change the state and re-render
userSelector.addEventListener("change", (e) => {
  e.preventDefault()
  console.log(e.target.value, "userSelector clicked")
  // update state.userId = e.target.value for multi users
  state.userId = e.target.value;
  state.userData = [];
  userDataDiv.innerHTML = ""
  render()
})

// render
function render() {
  updateState(state.userId)
  userIdText.innerHTML = `User ${state.userId} Listening History`
  userDataDiv.append(userIdText)

 if (state.userData.length === 0) {
  userDataDiv.innerText = "This user has no listening history"
 } else {
  for (let i = 0; i < state.userData.length; i++) {
    if (state.userData[i][1].length == 0) {
      // hide 
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



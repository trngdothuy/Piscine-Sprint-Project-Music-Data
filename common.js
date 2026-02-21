import { getUserIDs, getSong, getListenEvents } from "./data.js";


export const countUsers = () => getUserIDs().length;

export function getListeningHistory(userId) {
    return getListenEvents(userId)
};

console.log(getListeningHistory(1))

export function getMostListenedSongCount(userId) {
    let songs = {}
    getListeningHistory(userId).forEach((event) => {
    if (!songs[event.song_id]) {
        songs[event.song_id] = 1
    } else {songs[event.song_id]++}
    })
    const mostListenedSongCountId = Object.entries(songs).sort((a, b) => b[1] - a[1]).shift()[0]
    return getSong(mostListenedSongCountId)
}

export function getMostListenedSongTime(userId) {
    let songs = {}
    getListeningHistory(userId).forEach((event) => { 
        if (!songs[event.song_id]) {
            songs[event.song_id] = event["seconds_since_midnight"]
        } else {songs[event.song_id] += event["seconds_since_midnight"]}
     })
     console.log("getMostListenedSongTime", songs)
    const mostListenedSongTimeId = Object.entries(songs).sort((a, b) => b[1] - a[1]).shift()[0]
    console.log("getMostListenedSongTime", mostListenedSongTimeId)
    return getSong(mostListenedSongTimeId)
}

console.log(getMostListenedSongTime(1))
// console.log(((getMostListenedSongCount(3)).title));
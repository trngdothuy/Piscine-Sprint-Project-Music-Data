import { getUserIDs, getSong, getListenEvents } from "./data.js";

let songs = {}

export const countUsers = () => getUserIDs().length;

export function getListeningHistory(userId) {
    return getListenEvents(userId)
};

// console.log(getListeningHistory(1))

export function getMostListenedSongCount(userId) {
    getListeningHistory(userId).forEach((event) => {
    if (!songs[event.song_id]) {
        songs[event.song_id] = 1
    } else {songs[event.song_id]++}
    })
    console.log("songs", songs)
    const mostListenedSongId = Object.entries(songs).sort((a, b) => b[1] - a[1]).shift()[0]
    return getSong(mostListenedSongId)
}

console.log(((getMostListenedSongCount(3)).title));




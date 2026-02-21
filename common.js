import { getUserIDs, getSong, getListenEvents } from "./data.js";

let songs = {}

export const countUsers = () => getUserIDs().length;

export function getListeningHistory(userId) {
    return getListenEvents(userId)
};

console.log(getListeningHistory(1))

export function getMostListenedSongCount(userId) {
    getListeningHistory(userId).forEach((event) => {
    if (!songs[event.song_id]) {
        songs[event.song_id] = 1
    } else {songs[event.song_id]++}
    })
    const mostListenedSongCountId = Object.entries(songs).sort((a, b) => b[1] - a[1]).shift()[0]
    return getSong(mostListenedSongCountId)
}

export function getMostListenedSongTime(userId) {
    // let songs = {}
    // getListeningHistory(userId).forEach((event) => { 
    //     if (!songs[event.song_id]) {
    //         songs[event.song_id] = event["seconds_since_midnight"]
    //     } else {songs[event.song_id] += event["seconds_since_midnight"]}
    //  })
    // const mostListenedSongTimeId = Object.entries(songs).sort((a, b) => b[1] - a[1]).shift()[0]
    // return getSong(mostListenedSongTimeId)
}

export function getMostListenedArtistCount(userId) {
    let songs = {}
    getListeningHistory(userId).forEach((event) => {
    if (!songs[event.song_id]) {
        songs[event.song_id] = 1
    } else {songs[event.song_id]++}
    })
    console.log(Object.entries(songs))
    Object.entries(songs).forEach((song) => {
        console.log(song[0])
        console.log(getSong(song[0]))
    })
    // const mostListenedSongCountId = Object.entries(songs).sort((a, b) => b[1] - a[1]).shift()[0]
    // return getSong(mostListenedSongCountId)
}

console.log(getMostListenedArtistCount(1))
// console.log(((getMostListenedSongCount(3)).title));
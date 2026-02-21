import { getUserIDs, getSong, getListenEvents } from "./data.js";

export const countUsers = () => getUserIDs().length;


export function getListeningHistory(userId) {
    return getListenEvents(userId)
};

console.log(getListeningHistory(1))

function getSongsList(userId) {
    let songs = {} 
    getListeningHistory(userId).forEach((event) => {
    if (!songs[event.song_id]) {
        songs[event.song_id] = 1
    } else {songs[event.song_id]++}
    })
    return Object.entries(songs)
}

export function getMostListenedSongCount(userId) {
    const songsList = getSongsList(userId)
    const mostListenedSongCountId = songsList.sort((a, b) => b[1] - a[1]).shift()[0]
    return getSong(mostListenedSongCountId)
}

export function getMostListenedSongTime(userId) {
    const songsList = [...getSongsList(userId)]
    songsList.forEach(song => {
        song[1] *= getSong(song[0])["duration_seconds"]
    })
    const mostListenedSongTimeId = songsList.sort((a, b) => b[1] - a[1]).shift()[0]
    return getSong(mostListenedSongTimeId)
}

export function getMostListenedArtistCount(userId) {

}

console.log(getMostListenedArtistCount(1))
// console.log(((getMostListenedSongCount(3)).title));
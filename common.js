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
    return songs
}

export function getMostListenedSongCount(userId) {
    const songsList = getSongsList(userId)
    const mostListenedSongCountId = Object.entries(songsList).sort((a, b) => b[1] - a[1]).shift()[0]
    return getSong(mostListenedSongCountId)
}

export function getMostListenedSongTime(userId) {
    const songsList = [...Object.entries(getSongsList(userId))]

    songsList.forEach(song => {
        console.log(song[1])
        song[1] *= getSong(song[0])["duration_seconds"]
        
    })

    const mostListenedSongTimeId = songsList.sort((a, b) => b[1] - a[1]).shift()[0]
    return getSong(mostListenedSongTimeId)
}

export function getMostListenedArtistCount(userId) {

}

console.log(getMostListenedSongTime(1))
// console.log(((getMostListenedSongCount(3)).title));
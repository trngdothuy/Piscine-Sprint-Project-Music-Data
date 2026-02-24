import { getUserIDs, getSong, getListenEvents } from "./data.js";

export const countUsers = () => getUserIDs().length;

export function getListeningHistory(userId) {
    return getListenEvents(userId)
};

console.log("getListeningHistory(1)", getListeningHistory(1))

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
    const result = getSong(mostListenedSongCountId)
    return `${result.artist} - ${result.title}`
}

export function getMostListenedSongTime(userId) {
    const songsList = getSongsList(userId)
    songsList.forEach(song => {
        song[1] *= getSong(song[0])["duration_seconds"]
    })
    const mostListenedSongTimeId = songsList.sort((a, b) => b[1] - a[1]).shift()[0]
    const result = getSong(mostListenedSongTimeId)
    return `${result.artist} - ${result.title}`
}

export function getMostListenedArtistCount(userId) {
    const songsList = getSongsList(userId)
    songsList.map((song) => {
        song[0] = getSong(song[0])["artist"]
    })
    const result = songsList.reduce((accumulator, [name, value]) => {
        accumulator[name] = (accumulator[name] || 0) + value;
        return accumulator;
    }, {});
    return Object.entries(result).sort((a, b) => b[1] - a[1]).shift()[0]
}

export function getMostListenedArtistTime(userId) {
    const songsList = getSongsList(userId)
    songsList.forEach(song => {
        song[1] *= getSong(song[0])["duration_seconds"]
    })
    songsList.map((song) => {
        song[0] = getSong(song[0])["artist"]
    })
    const result = songsList.reduce((accumulator, [name, value]) => {
        accumulator[name] = (accumulator[name] || 0) + value;
        return accumulator;
    }, {});
    return Object.entries(result).sort((a, b) => b[1] - a[1]).shift()[0]
}

console.log(getMostListenedArtistTime(1))
// console.log(((getMostListenedSongCount(3)).title));
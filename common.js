import { getUserIDs, getSong, getListenEvents } from "./data.js";

export const countUsers = () => getUserIDs().length;

export function getListeningHistory(userId) {
    return getListenEvents(userId)
};

console.log("getListeningHistory(1)", getListeningHistory(1))

function getSongsList(userId) {
    return convertListeningEventsToSongsList(getListeningHistory(userId))
}

function convertListeningEventsToSongsList(listeningEvents) {
    let songs = {} 
    listeningEvents.forEach((event) => {
    if (!songs[event.song_id]) {
        songs[event.song_id] = 1
    } else {songs[event.song_id]++}
    })
    return Object.entries(songs)
}

function getTopSong(list) {
    const mostListenedSongId = list.sort((a, b) => b[1] - a[1]).shift()[0]
    const result = getSong(mostListenedSongId)
    return `${result.artist} - ${result.title}`
}

export function getMostListenedSongCount(userId) {
    const songsList = getSongsList(userId)
    return getTopSong(songsList)
}

export function getMostListenedSongTime(userId) {
    const songsList = getSongsList(userId)
    songsList.forEach(song => {
        song[1] *= getSong(song[0])["duration_seconds"]
    })
    return getTopSong(songsList)
}

function getTopArtist(list) {
    list.map((song) => {
        song[0] = getSong(song[0])["artist"]
    })
    const result = list.reduce((accumulator, [name, value]) => {
        accumulator[name] = (accumulator[name] || 0) + value;
        return accumulator;
    }, {});
    return Object.entries(result).sort((a, b) => b[1] - a[1]).shift()[0]
}

export function getMostListenedArtistCount(userId) {
    const songsList = getSongsList(userId)
    return getTopArtist(songsList)
}

export function getMostListenedArtistTime(userId) {
    const songsList = getSongsList(userId)
    songsList.forEach(song => {
        song[1] *= getSong(song[0])["duration_seconds"]
    })
    return getTopArtist(songsList)
}

export function isFridayNight(timestamp) {
    const date = new Date(timestamp)
    const day = date.getDay()
    const time = date.getHours()
    const isFridayEvening = day === 5 && time >= 17
    const isSaturdayMorning = day === 6 && time <= 4
    return isFridayEvening || isSaturdayMorning
}

function fridayNightListeningHistory(userId) {
    const songsList = getListeningHistory(userId)
    return songsList.filter((item) => isFridayNight(item.timestamp))
}

export function getMostListenedSongFridayNightCount(userId) {
    const listeningHistory = fridayNightListeningHistory(userId)
    const fridayNightSongsList = convertListeningEventsToSongsList(listeningHistory)
    return getTopSong(fridayNightSongsList)
}

export function getMostListenedSongFridayNightTime(userId) {
    const listeningHistory = fridayNightListeningHistory(userId)
    const songsList = convertListeningEventsToSongsList(listeningHistory)
    songsList.forEach(song => {
        song[1] *= getSong(song[0])["duration_seconds"]
    })
    return getTopSong(songsList)
}

console.log("he", getMostListenedSongFridayNightTime(1))
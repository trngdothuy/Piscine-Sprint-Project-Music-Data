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

export function getMostStreakSong(userId) {
    const songsList = getListeningHistory(userId)
    let maxStreakSong = songsList[0]["song_id"]
    let maxStreakCount = 1
    let currentStreakSong = songsList[0]["song_id"]
    let currentStreakCount = 1

    for (let i = 0; i < songsList.length - 1; i++) {
        if (songsList[i]["song_id"] === currentStreakSong) {
            currentStreakCount++
        } else {
            if (currentStreakCount > maxStreakCount) {
                maxStreakSong = currentStreakSong
                maxStreakCount = currentStreakCount
            }
            // console.log("sigfhj", songsList[i + 1])
            currentStreakSong = songsList[i + 1]["song_id"]
            currentStreakCount = 1
        }
    }
    const result = getSong(maxStreakSong)
    return `${result.artist} - ${result.title} (length: ${maxStreakCount})`
}

export function getSongListenedEveryDay(userId) {
    const listeningHistory = getListeningHistory(userId)

    // get unique days
    let uniqueDays = new Set()
    listeningHistory.forEach((item) => uniqueDays.add(item.timestamp.split('T')[0]))
    const numberOfUniqueDays = uniqueDays.size

    // each song with list of days played
    let songDaysPlayedList = {}
    for (const item of listeningHistory) {
        const day = item.timestamp.split('T')[0]
        if (!songDaysPlayedList[item.song_id]) {
            songDaysPlayedList[item.song_id] = new Set()
        }
        songDaysPlayedList[item.song_id].add(day)
    }

    // for each song, compare the days played with unique days, same => yes
    for (const song of Object.entries(songDaysPlayedList)) {
        const numberOfDaysPlayed = song[1].size
        if (numberOfDaysPlayed === numberOfUniqueDays) {
            const result = getSong(song[0])
            return `${result.artist} - ${result.title}`
        } 
    }
    return null
}

export function getTopGenres(userId) {
    const songsList = getSongsList(userId)
    const listSorted = songsList.sort((a, b) => b[1] - a[1])
    listSorted.map((song) => song[0] = getSong(song[0]).genre)

    const genresList = listSorted.reduce((accumulator, [name, value]) => {
        accumulator[name] = (accumulator[name] || 0) + value;
        return accumulator;
    }, {});

    const genresListSorted = Object.entries(genresList).sort((a, b) => b[1] - a[1])
    const topGenres = genresListSorted.slice(0, 3)

    const result = []
    topGenres.forEach((genre) => result.push(genre[0]))
    return result
}

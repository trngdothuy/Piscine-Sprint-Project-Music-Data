import { getUserIDs, getSong, getListenEvents } from "./data.js";

export const countUsers = () => getUserIDs().length;

export const songs = () => getSong();

console.log(songs)
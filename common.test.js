import { countUsers, getListeningHistory, getMostListenedSongCount } from "./common.js";
import { getSong, getListenEvents } from "./data.js";

test("User count is correct", () => {
  expect(countUsers()).toEqual(4);
});

test("Successfully fetch users listening events", () => {
  expect(typeof(getListeningHistory(1))).toEqual("object")
});

test("Most listened song count for user 1 is correct", () => {
  expect((getMostListenedSongCount(1)).title).toEqual("When Your Mind's Made Up")
});

test("Most listened song count for user 2 is correct", () => {
  expect((getMostListenedSongCount(2)).title).toEqual("I Still Believe")
});

test("Most listened song count for user 3 is correct", () => {
  expect((getMostListenedSongCount(3)).title).toEqual("Be More Kind")
});

test("Get correctly information of one song", () => {
  expect((getSong("song-1")).title).toEqual('I Got Love')
});

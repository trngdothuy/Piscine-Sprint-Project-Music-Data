import { countUsers, getListeningHistory, getMostListenedSongCount, isFridayNight } from "./common.js";
import { getSong, getListenEvents } from "./data.js";

test("User count is correct", () => {
  expect(countUsers()).toEqual(4);
});

test("Successfully fetch users listening events", () => {
  expect(typeof(getListeningHistory(1))).toEqual("object")
});

test("Most listened song count for user 1 is correct", () => {
  expect(getMostListenedSongCount(1)).toEqual("The Swell Season - When Your Mind's Made Up")
});

test("Most listened song count for user 2 is correct", () => {
  expect(getMostListenedSongCount(2)).toEqual("Frank Turner - I Still Believe")
});

test("Most listened song count for user 3 is correct", () => {
  expect(getMostListenedSongCount(3)).toEqual("Frank Turner - Be More Kind")
});

test("Get correctly information of one song", () => {
  expect((getSong("song-1")).title).toEqual('I Got Love')
});

test("Successfully get listen events from data.js", () => {
  expect(typeof(getListenEvents(1))).toEqual('object')
});

test("If timestamp is from Friday 5pm to Saturday 4am, then return true", () => {
  expect(isFridayNight("2024-08-02T18:30:00")).toEqual(true)
  expect(isFridayNight("2024-08-01T18:30:00")).toEqual(false)
})
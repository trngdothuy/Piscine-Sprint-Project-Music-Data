# Testing Record

1. To check if we get correct user count from `data.js`

In `common.test.js`
```
import { countUsers } from "./common.js";

test("User count is correct", () => {
  expect(countUsers()).toEqual(4);
});
```

2. To check if we successfully fetch users listening events from `data.js`

In `common.test.js`
```
import { getListeningHistory } from "./common.js";

test("Successfully fetch users listening events", () => {
  expect(typeof(getListeningHistory(1))).toEqual("object")
})
```

3. To check if we get the correct most listened songs count for each user

In `common.test.js`
```
import { getMostListenedSongCount } from "./common.js";

test("Most listened song count for user 1 is correct", () => {
  expect((getMostListenedSongCount(1)).title).toEqual("When Your Mind's Made Up")
})

test("Most listened song count for user 2 is correct", () => {
  expect((getMostListenedSongCount(2)).title).toEqual("I Still Believe")
})

test("Most listened song count for user 3 is correct", () => {
  expect((getMostListenedSongCount(3)).title).toEqual("Be More Kind")
})
```

4. To check if we get the correct song information from `data.js`
```
import { getSong } from "./data.js";

test("Get correctly information of one song", () => {
  expect((getSong("song-1")).title).toEqual('I Got Love')
});
```

5. To check if we successfully get listen events from data.js `data.js`
```
import { getListenEvents } from "./data.js";

test("Successfully get listen events from data.js", () => {
  expect(typeof(getListenEvents(1))).toEqual('object')
});
```

6. To check if isFridayNight works correctly
```
import { isFridayNight } from "./common.js";

test("If timestamp is from Friday 5pm to Saturday 4am, then return true", () => {
  expect(isFridayNight("2024-08-02T18:30:00")).toEqual(true)
  expect(isFridayNight("2024-08-01T18:30:00")).toEqual(false)
})
```

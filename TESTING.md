# Testing Record

1. To check if we get correct user count from `data.js`

In `common.test.js`
```
import { countUsers } from "./common.js";

test("User count is correct", () => {
  expect(countUsers()).toEqual(4);
});
```

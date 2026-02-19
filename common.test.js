import { countUsers } from "./common.js";

test("User count is correct", () => {
  expect(countUsers()).toEqual(4);
});
import timeConversion from "./timeConversion";

test("time diffrence converted to minutes and seconds", () => {
  // Start and end times are given in milliseconds
  expect(timeConversion(90000, 180546)).toStrictEqual({
    minutes: 1,
    seconds: 30,
  });
});

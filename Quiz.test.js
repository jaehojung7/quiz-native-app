import timeConversion from "./src/screens/Quiz";
import shuffleList from "./src/components/SingleQuestion";

test("time is converted to minutes and seconds", () => {
  expect(
    timeConversion(0, 90).toBe({
      minutes: 1,
      seconds: 30,
    })
  );
});

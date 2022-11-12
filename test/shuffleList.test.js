import shuffleList from "./shuffleList";

const exampleList = ["tomato", "blueberry", "bread", "water"];

test("shuffled array contains the same elements", () => {
  const testShuffledArray = (array, shuffledArray) => {
    let testResults = [];
    array.forEach(
      (element, index) => (testResults[index] = shuffledArray.includes(element))
    );
    return testResults;
  };
  const shuffledArray = shuffleList(exampleList);
  console.log(shuffledArray);
  expect(testShuffledArray(exampleList, shuffledArray)).toEqual(
    new Array(exampleList.length).fill(true)
  );
});

const objectLookUp = require("../db/seeds/seed-Util");

describe("objectLookup()", () => {
  test("Returns a new object.", () => {
    const array = [];
    const output = objectLookUp(array);
    expect(output).toEqual({});
  });
  test("Returns key-value pairs when passed in 1 item in the array of objects.", () => {
    const arrayOfObjects = [{ name: "jordan", age: 31 }];
    const result = { jordan: 31 };
    const output = objectLookUp(arrayOfObjects, "name", "age");
    expect(output).toEqual(result);
  });
  test("Returns key-value pairs when passed in multiple items in the array of objects.", () => {
    const arrayOfObjects = [
      { name: "jordan", age: 31, favouriteFood: "pizza", petName: "luna" },
      { name: "hayley", age: 37, favouriteFood: "thai", petName: "hayles" },
      { name: "Jay-j", age: 9, favouriteFood: "curry", petName: "lou" },
    ];
    const result = { pizza: "luna", thai: "hayles", curry: "lou" };
    const output = objectLookUp(arrayOfObjects, "favouriteFood", "petName");
    expect(output).toEqual(result);
  });
  test("Does not mutate orginal data.", () => {
    const arrayOfObjects = [
      { name: "jordan", age: 31, favouriteFood: "pizza", petName: "luna" },
    ];
    const arrayOfObjectsCopy = [
      { name: "jordan", age: 31, favouriteFood: "pizza", petName: "luna" },
    ];
    const output = objectLookUp(arrayOfObjects, "name", "favouriteFood");
    expect(arrayOfObjects).toEqual(arrayOfObjectsCopy);
  });
});

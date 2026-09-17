const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");

const context = vm.createContext({});
vm.runInContext(
  readFileSync(join(__dirname, "../calculator.js"), "utf8"),
  context,
);
const calculate = (type, people) =>
  JSON.parse(JSON.stringify(context.calculateIngredients(type, people)));

test("froment : proportions pour quatre personnes", () => {
  assert.deepEqual(calculate("sweet", 4), {
    flour: 250,
    eggs: 3,
    milk: 400,
    water: 100,
    portions: 12,
    eggsRounded: false,
  });
});

test("sarrasin : sans lait ni œuf", () => {
  assert.deepEqual(calculate("savory", 4), {
    flour: 250,
    eggs: 0,
    milk: 0,
    water: 500,
    portions: 8,
    eggsRounded: false,
  });
});

test("une personne : arrondis pratiques et au moins un œuf au froment", () => {
  assert.deepEqual(calculate("sweet", 1), {
    flour: 63,
    eggs: 1,
    milk: 100,
    water: 25,
    portions: 3,
    eggsRounded: true,
  });
});

test("les proportions doublent pour huit personnes", () => {
  for (const type of ["sweet", "savory"]) {
    const four = calculate(type, 4);
    const eight = calculate(type, 8);
    for (const key of ["flour", "eggs", "milk", "water", "portions"]) {
      assert.equal(eight[key], four[key] * 2);
    }
  }
});

test("toute la plage autorisée fournit des quantités valides", () => {
  for (let people = 1; people <= 100; people++) {
    for (const type of ["sweet", "savory"]) {
      const result = calculate(type, people);
      for (const key of ["flour", "eggs", "milk", "water", "portions"]) {
        assert.ok(Number.isInteger(result[key]) && result[key] >= 0);
      }
      assert.equal(result.eggsRounded, type === "sweet" && people % 4 !== 0);
    }
  }
});

test("les entrées invalides sont rejetées", () => {
  for (const value of [0, -1, 101, 2.5, NaN, Infinity, "4", null, undefined]) {
    assert.throws(() => calculate("sweet", value), { name: "RangeError" });
  }
  for (const type of ["unknown", "__proto__", "toString", undefined]) {
    assert.throws(() => calculate(type, 4), { name: "RangeError" });
  }
});

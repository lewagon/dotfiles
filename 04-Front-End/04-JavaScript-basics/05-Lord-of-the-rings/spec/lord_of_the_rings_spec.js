const assert = require("assert");
const { whoWinsTheWar, buildSoldierObject, isGood } = require("../lib/lord_of_the_rings");

describe("Exercise 3", () => {
  describe("isGood", () => {
    ["Hobbits", "Elves", "Dwarves", "Eagles"].forEach((soldierType) => {
      it(`should return true for ${soldierType}`, () => {
        assert.equal(isGood(soldierType), true);
      });
    });

    ["Orcs", "Wargs", "Goblins", "Uruk Hai", "Trolls"].forEach((soldierType) => {
      it(`should return false for ${soldierType}`, () => {
        assert.equal(isGood(soldierType), false);
      });
    });
  });

  describe("buildSoldierObject", () => {
    const battlefield = "Hobbits:1,Elves:2,Dwarves:3,Eagles:4,Orcs:5,Wargs:6,Goblins:7";
    it(`should build an object with 7 keys for battlefield '${battlefield}'`, () => {
      const soldierObject = buildSoldierObject(battlefield);
      assert.equal(Object.keys(soldierObject).length, 7);
      assert.equal(soldierObject["Humans"], undefined);
      assert.strictEqual(soldierObject['Hobbits'], 1);
      assert.strictEqual(soldierObject['Elves'], 2);
      assert.strictEqual(soldierObject['Dwarves'], 3);
      assert.strictEqual(soldierObject['Goblins'], 7);
    });
  });

  describe("whoWinsTheWar", () => {
    it("should return 'Tie' if there are no soldiers", () => {
      assert.equal(whoWinsTheWar(""), "Tie");
    });

    [
      ["Tie", "Elves:3,Eagles:5,Goblins:2,Uruk Hai:6"],
      ["Good", "Hobbits:1"],
      ["Evil", "Goblin:2,Wargs:3"],
      ["Evil", "Hobbits:1,Elves:2,Dwarves:3,Eagles:4,Orcs:5,Wargs:6,Goblins:7"]
    ].forEach((scenario) => {
      const [outcome, battlefield] = scenario;
      it(`should return '${outcome}' with the following battlefield: '${battlefield}'`, () => {
        assert.equal(whoWinsTheWar(battlefield), outcome);
      });
    });
  });
});

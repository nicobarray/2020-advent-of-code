const fs = require("fs");
const path = require("path");

const buff = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const lines = buff.split("\n");

function firstStar() {
  function countTrees(x, y, treeCount) {
    const square = lines[y][x];

    if (square === "#") {
      if (y + 1 === lines.length) {
        return treeCount + 1;
      }

      return countTrees((x + 3) % lines[0].length, y + 1, treeCount + 1);
    }

    if (y + 1 === lines.length) {
      return treeCount;
    }
    return countTrees((x + 3) % lines[0].length, y + 1, treeCount);
  }

  return countTrees(3, 1, 0);
}

function secondStar() {
  function countTrees(x, y, deltaX, deltaY, treeCount) {
    const square = lines[y][x];

    if (square === "#") {
      if (y + deltaY >= lines.length) {
        return treeCount + 1;
      }

      return countTrees(
        (x + deltaX) % lines[0].length,
        y + deltaY,
        deltaX,
        deltaY,
        treeCount + 1
      );
    }

    if (y + deltaY >= lines.length) {
      return treeCount;
    }
    return countTrees(
      (x + deltaX) % lines[0].length,
      y + deltaY,
      deltaX,
      deltaY,
      treeCount
    );
  }

  return [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]
    .map((pos) => countTrees(pos.x, pos.y, pos.x, pos.y, 0))
    .reduce((mult, treeCount) => mult * treeCount, 1);
}

console.log(firstStar());
console.log(secondStar());

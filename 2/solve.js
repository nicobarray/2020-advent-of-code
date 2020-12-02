const fs = require("fs");
const path = require("path");

const buff = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const lines = buff.split("\n");

function firstStar() {
  let count = 0;
  for (let line of lines) {
    const [rule, password] = line.split(":").map((val) => val.trim());
    const [range, ruleLetter] = rule.split(" ");
    const [min, max] = range.split("-").map((val) => Number(val));

    let occurrence = 0;
    for (let letter of password) {
      if (letter === ruleLetter) {
        occurrence++;
      }
    }

    if (occurrence >= min && occurrence <= max) {
      count++;
    }
  }

  return count;
}

function secondStar() {
  let count = 0;
  for (let line of lines) {
    const [rule, password] = line.split(":").map((val) => val.trim());
    const [range, ruleLetter] = rule.split(" ");
    const [indexA, indexB] = range.split("-").map((val) => Number(val) - 1);

    const isAtFirstIndex = password[indexA] === ruleLetter;
    const isAtSecondIndex = password[indexB] === ruleLetter;

    if (
      (isAtFirstIndex && !isAtSecondIndex) ||
      (!isAtFirstIndex && isAtSecondIndex)
    ) {
      count++;
    }
  }

  return count;
}

console.log(firstStar());
console.log(secondStar());

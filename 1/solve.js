const fs = require("fs");
const path = require("path");

const buff = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const numbers = buff.split("\n").map((line) => Number(line));

function firstStar() {
  for (let a of numbers) {
    for (let b of numbers) {
      if (a + b === 2020) {
        return a * b;
      }
    }
  }
}

function secondStar() {
  for (let a of numbers) {
    for (let b of numbers) {
      for (let c of numbers) {
        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }
}

console.log(firstStar());
console.log(secondStar());

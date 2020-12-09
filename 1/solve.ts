const numbers = (await Deno.readTextFile("./input.txt")).split("\n").map(
  Number,
);

export function firstStar() {
  for (let a of numbers) {
    for (let b of numbers) {
      if (a + b === 2020) {
        return a * b;
      }
    }
  }
}

export function secondStar() {
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

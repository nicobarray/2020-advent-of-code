function findNumber(sequence: number[], nth: number) {
  function sayNumber(lastNumber: number, index: number) {
    if (lastNumber in numberLastOccurrence) {
      return index - 1 - numberLastOccurrence[lastNumber];
    } else {
      return 0;
    }
  }

  const numberLastOccurrence: Record<number, number> = {};
  let lastNumber: number = sequence[0];
  let lastTs = Date.now();
  for (let i = 1; i < nth; i++) {
    const currentNumber = sequence[i] ?? sayNumber(lastNumber, i);
    numberLastOccurrence[lastNumber] = i - 1;
    lastNumber = currentNumber;
    if (i % 1000000 === 0) {
      const now = Date.now();
      console.log(
        (now - lastTs) / 1000,
        "s",
        Math.trunc(i / 1000000) + "/" + Math.trunc(nth / 1000000),
      );
      lastTs = now;
    }
  }

  return lastNumber;
}

export async function firstStar(path: string) {
  const sequence = (await Deno.readTextFile(path)).split(",").map(Number);
  return findNumber(sequence, 2020);
}

export async function secondStar(path: string) {
  const sequence = (await Deno.readTextFile(path)).split(",").map(Number);
  return findNumber(sequence, 30000000);
}

console.log(await firstStar("./input.txt"));
console.log(await secondStar("./input.txt"));

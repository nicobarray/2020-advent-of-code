export async function firstStar() {
  const numbers = (await Deno.readTextFile("./input.txt")).split("\n").map(
    Number,
  );

  // Return true if the sum can be found, false otherwise.
  function findSum(
    target: number,
    numbers: number[],
  ): boolean {
    for (let i of numbers) {
      for (let j of numbers) {
        if (i !== j && i + j === target) {
          return true;
        }
      }
    }

    return false;
  }

  function findWeakness(preambule: number) {
    for (let i = preambule; i < numbers.length; i++) {
      const hasSum = findSum(numbers[i], numbers.slice(i - preambule, i));

      if (!hasSum) {
        return numbers[i];
      }
    }

    return -1;
  }

  return findWeakness(25);
}

export async function secondStar() {
  const numbers = (await Deno.readTextFile("./input.txt")).split("\n").map(
    Number,
  );

  // Return true if the sum can be found, false otherwise.
  function findSum(
    target: number,
    numbers: number[],
  ): boolean {
    for (let i of numbers) {
      for (let j of numbers) {
        if (i !== j && i + j === target) {
          return true;
        }
      }
    }

    return false;
  }

  function findWeakness(preambule: number) {
    for (let i = preambule; i < numbers.length; i++) {
      const hasSum = findSum(numbers[i], numbers.slice(i - preambule, i));

      if (!hasSum) {
        return i;
      }
    }

    return -1;
  }

  const weakness = findWeakness(25);

  function trySum(smallest: number) {
    let sum = numbers[smallest];
    for (let i = smallest + 1; i < weakness; i++) {
      sum += numbers[i];

      if (sum === numbers[weakness]) {
        return i;
      }
    }

    return weakness;
  }

  const get = (
    a: number,
    b: number,
    compare: (i: number, target: number) => boolean,
  ) => {
    let index = a;
    for (let i = a + 1; i <= b; i++) {
      if (compare(i, index)) {
        index = i;
      }
    }
    return index;
  };

  for (let i = 0; i < weakness; i++) {
    const largest = trySum(i);

    if (largest >= weakness) {
      continue;
    }

    return numbers[get(i, largest, (i, min) => numbers[i] < numbers[min])] +
      numbers[get(i, largest, (i, max) => numbers[i] > numbers[max])];
  }

  return null;
}

console.log(await firstStar());
console.log(await secondStar());

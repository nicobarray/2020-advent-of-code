const input = await Deno.readTextFile("./input.txt");

function sortAdapters(adapters: string) {
  const sortedAdapters = adapters.split("\n").map(Number).sort((a, b) => a - b);
  return [0, ...sortedAdapters, Math.max(...sortedAdapters) + 3];
}

export function firstStart(adapters: string) {
  const sortedAdapters = sortAdapters(adapters);

  function countDeltas(adapters: number[], delta: number): number {
    const [first, second, ...others] = adapters;

    if (first === undefined || second === undefined) {
      return 0;
    }

    if (second - first === delta) {
      return 1 + countDeltas([second, ...others], delta);
    }

    return countDeltas([second, ...others], delta);
  }

  return countDeltas(sortedAdapters, 1) * countDeltas(sortedAdapters, 3);
}

export function secondStar(inputString: string) {
  const sortedAdapters = sortAdapters(inputString);

  function solution(list: number[], memo: Record<number, number> = {}): number {
    const [head, ...tail] = list;

    if (tail.length === 0) {
      return 1;
    }

    let res = 0;
    for (let step of [1, 2, 3]) {
      const path = tail.findIndex((n) => n === head + step);
      if (path !== -1) {
        if (tail[path] in memo) {
          res += memo[tail[path]];
        } else {
          memo[tail[path]] = solution(tail.slice(path), memo);
          res += memo[tail[path]];
        }
      }
    }

    return res;
  }

  return solution(sortedAdapters);
}

console.log(firstStart(input));
console.log(secondStar(input));

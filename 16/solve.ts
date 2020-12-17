// deno run --allow-read solve.ts

function isValidTicket(value: number, rule: number[]): boolean {
  return (value >= rule[0] && value <= rule[1]) ||
    (value >= rule[2] && value <= rule[3]);
}

export async function firstStar(path: string) {
  const file = await Deno.readTextFile(path);

  const rules: number[][] = [];

  let mode = 0;
  return file.split("\n").reduce((errorRate: number, line: string) => {
    if (line.length === 0) {
      mode++;
      return errorRate;
    }

    // Rule parsing.
    if (mode === 0) {
      const [, rule] = line.split(":");
      const ranges = rule.split(" or ").flatMap((range) =>
        range.split("-").map(Number)
      );
      rules.push(ranges);
      return errorRate;
    }

    // My ticket.
    if (mode === 1) {
      return errorRate;
    }

    if (line === "nearby tickets:") {
      return errorRate;
    }

    // Nearby tickets.
    const ticket = line.split(",").map(Number);

    return errorRate +
      (ticket.find((field) =>
        !rules.some((rule) => isValidTicket(field, rule))
      ) ??
        0);
  }, 0);
}

export async function secondStar(path: string) {
  const file = await Deno.readTextFile(path);
}

console.log("First star ⭐️");
console.log("example.txt", await firstStar("./example.txt"));
console.log("input.txt", await firstStar("./input.txt"));

console.log("Second star ⭐️⭐️");
console.log("example.txt", await secondStar("./example.txt"));
console.log("input.txt", await secondStar("./input.txt"));

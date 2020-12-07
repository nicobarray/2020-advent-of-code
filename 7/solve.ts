export async function firstStar() {
  const file = await Deno.readTextFile("./input.txt");

  function tokenize(code: string) {
    return code.split("\n").flatMap((line) => line.split(/(contain|\,|\.)/g))
      .map(
        (str) => str.replace(/(bags?|contain|\,)/g, "").trim(),
      )
      .filter(Boolean);
  }

  function parse(
    tokens: string[],
    bag: string | undefined = undefined,
  ): Record<string, string[]> {
    if (tokens.length === 0) {
      return {};
    }

    const [head, ...tail] = tokens;

    if (head === ".") {
      return parse(tail, undefined);
    }

    if (!bag) {
      return parse(tail, head);
    }

    const otherBags = parse(tail, bag);
    return {
      ...otherBags,
      [bag]: [
        head.replace(/\d/g, "").trim(),
        ...otherBags[bag] ?? [],
      ].filter((bag_) => bag_ !== "no other"),
    };
  }

  const tokens = tokenize(
    file,
  );

  const rulesMap = parse(tokens);

  delete rulesMap["shiny gold"];

  function solve(rules: string[]): number {
    if (rules.length === 0) {
      return 0;
    }

    if (rules.includes("shiny gold")) {
      return 1;
    }

    return rules.reduce(
      (sum: number, rule: string) => sum + (solve(rulesMap[rule]) > 0 ? 1 : 0),
      0,
    );
  }

  return solve(Object.keys(rulesMap));
}

export async function secondStart() {
  const file = await Deno.readTextFile("./input.txt");

  function tokenize(code: string) {
    return code.split("\n").flatMap((line) => line.split(/(contain|\,|\.)/g))
      .map(
        (str) => str.replace(/(bags?|contain|\,)/g, "").trim(),
      )
      .filter(Boolean);
  }

  type Bag = {
    name: string;
    capacity: number;
  };

  function parse(
    tokens: string[],
    bag: string | undefined = undefined,
  ): Record<string, Bag[]> {
    if (tokens.length === 0) {
      return {};
    }

    const [head, ...tail] = tokens;

    if (head === ".") {
      return parse(tail, undefined);
    }

    if (!bag) {
      return parse(tail, head);
    }

    const otherBags = parse(tail, bag);
    return {
      ...otherBags,
      [bag]: [
        {
          name: head.replace(/\d/g, "").trim(),
          capacity: Number(head.replace(/\D/g, "").trim()),
        },
        ...otherBags[bag] ?? [],
      ].filter((bag_) => bag_.name !== "no other"),
    };
  }

  const tokens = tokenize(
    file,
  );

  const rulesMap = parse(tokens);

  const entryRules = rulesMap["shiny gold"];
  delete rulesMap["shiny gold"];

  function solve(rules: Bag[]): number {
    // A bag that contains 0 bags has capacity 0
    if (rules.length === 0) {
      return 0;
    }

    // A bag that contain n bags of capacity N has capacity n + n * N => (n * (N + 1))
    return rules.reduce(
      (sum: number, rule: Bag) =>
        sum + rule.capacity * (solve(rulesMap[rule.name]) + 1),
      0,
    );
  }

  return solve(entryRules);
}

console.log(await firstStar());
console.log(await secondStart());

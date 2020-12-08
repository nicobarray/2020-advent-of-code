export async function firstStar() {
  const sourceCode = await Deno.readTextFile("./input.txt");

  function parseInstr(call: string): [string, number] {
    const [intr, value] = call.split(" ");
    return [intr, Number(value)];
  }

  function fixProgram(
    program: [string, number][],
    i: number = 0,
    memo: Record<number, boolean> = {},
  ): number {
    if (i < 0 || i >= program.length) {
      return 0;
    }

    if (memo[i]) {
      return 0;
    }

    memo[i] = true;

    const [instr, value] = program[i];

    if (instr === "nop") {
      return fixProgram(program, i + 1, memo);
    }

    if (instr === "jmp") {
      return fixProgram(program, i + value, memo);
    }

    // instr is acc
    return value + fixProgram(program, i + 1, memo);
  }

  return fixProgram(sourceCode.split(/\n/).map(parseInstr));
}

export async function secondStar() {
  const sourceCode = await Deno.readTextFile("./input.txt");

  function parseInstr(call: string): [string, number] {
    const [intr, value] = call.split(" ");
    return [intr, Number(value)];
  }

  function fixProgram(
    program: [string, number][],
    i: number = 0,
    memo: Record<number, boolean> = {},
  ): number {
    if (i < 0 || i >= program.length) {
      return 0;
    }

    if (memo[i]) {
      throw "overflow";
    }

    memo[i] = true;

    const [instr, value] = program[i];

    if (instr === "nop") {
      return fixProgram(program, i + 1, memo);
    }

    if (instr === "jmp") {
      return fixProgram(program, i + value, memo);
    }

    // instr is acc
    return value + fixProgram(program, i + 1, memo);
  }

  // Let's bruteforce this...
  const seq = sourceCode.split("\n").map(parseInstr);
  for (let i = 0; i < seq.length; i++) {
    try {
      if (seq[i][0] !== "acc") {
        return fixProgram(
          seq.map(([instr, value], j) =>
            j === i
              ? [seq[i][0] === "jmp" ? "nop" : "jmp", value]
              : [instr, value]
          ),
        );
      }
    } catch (err) {
      if (err === "overflow") {
        continue;
      }
      throw err;
    }
  }

  return 0;
}

console.log(await firstStar());
console.log(await secondStar());

export async function firstStar() {
  const file = await Deno.readTextFile("./input.txt");

  let mask = "";
  let mem: Record<string, number> = {};
  file.split("\n").forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.split(" = ")[1];
    } else {
      const [addr, value] = line.split(/mem\[|\] = /).filter(Boolean);
      const binValue = Number(value).toString(2).padStart(36, "0");
      let maskedValue = "";
      for (let i = 0; i < mask.length; i++) {
        const m = mask[i];
        const v = binValue[i];
        if (m === "X") {
          maskedValue += v;
        } else {
          maskedValue += m;
        }
      }
      mem[addr] = parseInt(maskedValue, 2);
    }
  });

  return Object.keys(mem).map((key) => mem[key]).reduce(
    (acc: number, value: number) => acc + value,
    0,
  );
}

export async function secondStar() {
  const file = await Deno.readTextFile("./input.txt");

  function resolveMad(mad: string, index = 0): string[] {
    if (index === mad.length) {
      return [mad];
    }

    const m = mad[index];

    if (m === "X") {
      return [
        ...resolveMad(
          [...mad].map((l, i) => i === index ? "0" : l).join(""),
          index + 1,
        ),
        ...resolveMad(
          [...mad].map((l, i) => i === index ? "1" : l).join(""),
        ),
      ];
    }

    return resolveMad(mad, index + 1);
  }

  let mask = "";
  let mem: Record<string, number> = {};
  file.split("\n").forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.split(" = ")[1];
    } else {
      const [addr, value] = line.split(/mem\[|\] = /).filter(Boolean);
      const binAddr = Number(addr).toString(2).padStart(36, "0");
      let mad = "";
      for (let i = 0; i < mask.length; i++) {
        const m = mask[i];
        const v = binAddr[i];
        if (m === "0") {
          mad += v;
        } else {
          mad += m;
        }
      }

      resolveMad(mad).map((addr) => parseInt(addr, 2)).forEach(
        (addr) => {
          mem[addr] = Number(value);
        },
      );
    }
  });

  return Object.keys(mem).map((key) => mem[key]).reduce(
    (acc: number, value: number) => acc + value,
    0,
  );
}

console.log(await firstStar());
console.log(await secondStar());

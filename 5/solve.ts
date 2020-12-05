async function firstStar() {
  const tickets = await Deno.readTextFile("./input.txt");

  type MovePivot = "Less" | "More" | "Equal";
  function nextPivot(
    bounds: [number, number],
    delta: MovePivot,
  ): [number, number] {
    const [min, max] = bounds;
    const magnitude = max - min;
    const nextPivot = magnitude / 2;

    switch (delta) {
      case "Less":
        return [min, max - Math.floor(nextPivot)];
      case "More":
        return [min + Math.ceil(nextPivot), max];
      case "Equal":
        return bounds;
    }
  }

  function toSeatId(
    boardingPass: string,
    row: [number, number] = [0, 127],
    col: [number, number] = [0, 7],
  ): number {
    if (!boardingPass) {
      return row[0] * 8 + col[0];
    }

    const [flag, ...restOfTheBoardingPass] = boardingPass.split("");

    const rowRules: Record<"F" | "B", MovePivot> = {
      "F": "Less",
      "B": "More",
    };

    const colRules: Record<"L" | "R", MovePivot> = {
      "L": "Less",
      "R": "More",
    };

    return toSeatId(
      restOfTheBoardingPass.join(""),
      nextPivot(row, rowRules[flag as "F" | "B"] ?? "Equal"),
      nextPivot(col, colRules[flag as "L" | "R"] ?? "Equal"),
    );
  }

  return tickets.split("\n").map((ticket) => toSeatId(ticket)).reduce(
    (max, seatId) => seatId > max ? seatId : max,
    -1,
  );
}

async function secondStar() {
  const tickets = await Deno.readTextFile("./input.txt");

  type MovePivot = "Less" | "More" | "Equal";
  function nextPivot(
    bounds: [number, number],
    delta: MovePivot,
  ): [number, number] {
    const [min, max] = bounds;
    const magnitude = max - min;
    const nextPivot = magnitude / 2;

    switch (delta) {
      case "Less":
        return [min, max - Math.floor(nextPivot)];
      case "More":
        return [min + Math.ceil(nextPivot), max];
      case "Equal":
        return bounds;
    }
  }

  function toSeatId(
    boardingPass: string,
    row: [number, number] = [0, 127],
    col: [number, number] = [0, 7],
  ): number {
    if (!boardingPass) {
      return row[0] * 8 + col[0];
    }

    const [flag, ...restOfTheBoardingPass] = boardingPass.split("");

    const rowRules: Record<"F" | "B", MovePivot> = {
      "F": "Less",
      "B": "More",
    };

    const colRules: Record<"L" | "R", MovePivot> = {
      "L": "Less",
      "R": "More",
    };

    return toSeatId(
      restOfTheBoardingPass.join(""),
      nextPivot(row, rowRules[flag as "F" | "B"] ?? "Equal"),
      nextPivot(col, colRules[flag as "L" | "R"] ?? "Equal"),
    );
  }

  let [current, ...nextSeats] = tickets.split("\n").map((ticket) =>
    toSeatId(ticket)
  ).sort();

  for (let nextSeat of nextSeats) {
    if (current !== nextSeat - 1) {
      return current + 1;
    }

    current = nextSeat;
  }
}

console.log(await firstStar());
console.log(await secondStar());

export {};

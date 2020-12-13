const file = await Deno.readTextFile("./input.txt");

type Seat = "L" | "#" | ".";

export function firstStar() {
  function isSeat(raw: any): raw is Seat {
    return raw === "L" || raw === "#" || raw === ".";
  }

  const seats0: Seat[] = file.split("").filter(isSeat);
  const width: number = file.split("\n")[0].length;
  const height: number = file.split("\n").length;

  function nextSeat(seatIndex: number, seats: Seat[]): Seat {
    const seat = seats[seatIndex];

    let neighboursCount = 0;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) {
          continue;
        }

        const i = (seatIndex % width) + x;
        const j = Math.floor(seatIndex / width) + y;

        if (i < 0 || i >= width || j < 0 || j >= height) {
          continue;
        }

        const n = i + j * width;
        const neighbour = seats[n];

        if (neighbour === "#") {
          neighboursCount++;
        }
      }
    }

    if (seats[seatIndex] === "L") {
      if (neighboursCount === 0) {
        return "#";
      }
    }

    if (seats[seatIndex] === "#") {
      if (neighboursCount >= 4) {
        return "L";
      }
    }

    return seats[seatIndex];
  }

  function computeNextGen(seats: Seat[]): Seat[] {
    return seats.map((seat: Seat, index: number) => nextSeat(index, seats));
  }

  function solve(state: Seat[], prevCount = -1): number {
    const count = state.reduce(
      (acc: number, seat: Seat) => (seat === "#" ? 1 : 0) + acc,
      0,
    );
    if (prevCount !== count) {
      return solve(computeNextGen(state), count);
    }

    return count;
  }

  return solve(seats0);
}

export function secondStar() {
  function isSeat(raw: any): raw is Seat {
    return raw === "L" || raw === "#" || raw === ".";
  }

  const seats0: Seat[] = file.split("").filter(isSeat);
  const width: number = file.split("\n")[0].length;
  const height: number = file.split("\n").length;

  function nextSeat(seatIndex: number, seats: Seat[]): Seat {
    const seat = seats[seatIndex];

    let neighboursCount = 0;

    function canSee(x: number, y: number, dx: number, dy: number): number {
      if (x < 0 || y < 0 || x >= width || y >= height) {
        return 0;
      }

      const index = x + y * width;

      if (seats[index] === "L") {
        return 0;
      }

      if (seats[index] === "#") {
        return 1;
      }

      return canSee(x + dx, y + dy, dx, dy);
    }

    const x0 = seatIndex % width;
    const y0 = Math.floor(seatIndex / width);

    neighboursCount = canSee(x0, y0 - 1, 0, -1) +
      canSee(x0, y0 + 1, 0, 1) +
      canSee(x0 - 1, y0, -1, 0) +
      canSee(x0 + 1, y0, 1, 0) +
      canSee(x0 - 1, y0 - 1, -1, -1) +
      canSee(x0 + 1, y0 - 1, 1, -1) +
      canSee(x0 - 1, y0 + 1, -1, 1) +
      canSee(x0 + 1, y0 + 1, 1, 1);

    if (seats[seatIndex] === "L") {
      if (neighboursCount === 0) {
        return "#";
      }
    }

    if (seats[seatIndex] === "#") {
      if (neighboursCount >= 5) {
        return "L";
      }
    }

    return seats[seatIndex];
  }

  function computeNextGen(seats: Seat[]): Seat[] {
    return seats.map((seat: Seat, index: number) => nextSeat(index, seats));
  }

  function solve(state: Seat[], prevCount = -1): number {
    const count = state.reduce(
      (acc: number, seat: Seat) => (seat === "#" ? 1 : 0) + acc,
      0,
    );
    if (prevCount !== count) {
      return solve(computeNextGen(state), count);
    }

    return count;
  }

  return solve(seats0);
}

console.log(firstStar());
console.log(secondStar());

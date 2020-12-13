export async function firstStar(path: string) {
  const file = await Deno.readTextFile(path);
  const [rawTimestamp, rawBuses] = file.split("\n");

  const timestamp = Number(rawTimestamp);
  const buses = rawBuses.split(",").map(Number).filter((bus) =>
    Number.isSafeInteger(bus)
  );

  const closest = buses.map((bus) => ({
    bus,
    closestTimestamp: Math.ceil(timestamp / bus) * bus,
  })).reduce(
    (nextBus, bus) => {
      return nextBus.closestTimestamp < bus.closestTimestamp ? nextBus : bus;
    },
    { bus: -1, closestTimestamp: 2 ** 53 },
  );

  return (closest.closestTimestamp - timestamp) * closest.bus;
}

export async function secondStar(path: string, from: number, to: number) {
  const file = await Deno.readTextFile(path);
  const buses = file.split("\n")[1].split(",").map(Number);
  const minBus = Math.min(...buses.filter((a) => !Number.isNaN(a)));

  function solve(from: number, to: number) {
    let timestamp = from;
    while (timestamp <= from + to) {
      timestamp += minBus;
      const canCut = (bus: number, busIndex: number) =>
        Number.isSafeInteger(bus) ? !((timestamp + busIndex) % bus) : true;

      if (buses.every(canCut)) {
        return timestamp;
      }
    }
  }

  return solve(from, to);
}

console.log(await firstStar("./input.txt"));
// Was not able to produce a function quick enough to compute the input.txt solution.
console.log(await secondStar("./example.txt", 0, 10000000));

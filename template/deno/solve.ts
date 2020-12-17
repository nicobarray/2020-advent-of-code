// deno run --allow-read solve.ts

export async function firstStar(path: string) {
  const file = await Deno.readTextFile(path);
}
export async function secondStar(path: string) {
  const file = await Deno.readTextFile(path);
}
console.log("First star ⭐️");
console.log("example.txt", await firstStar("./example.txt"));
console.log("input.txt", await firstStar("./input.txt"));

console.log("Second star ⭐️⭐️");
console.log("example.txt", await firstStar("./example.txt"));
console.log("input.txt", await firstStar("./input.txt"));

export async function firstStar() {
  const file = await Deno.readTextFile("./input.txt");
  return (file + "\n").split("\n").reduce<[number, string]>(
    ([sum, group], ans) => {
      if (ans.length === 0) {
        return [sum + new Set((group + ans)).size, ""];
      }
      return [sum, group + ans];
    },
    [0, ""],
  )[0];
}

export async function secondStar() {
  const file = await Deno.readTextFile("./input.txt");

  function intersect(stringA: string, stringB: string): string {
    return stringA.split("").filter((letter) =>
      stringB.split("").includes(letter)
    ).join("");
  }

  return (file + "\n").split("\n").reduce<[number, string, boolean]>(
    ([sum, group, skip], ans) => {
      // All the group was parsed, sum the common answer count to the global count.
      if (ans.length === 0) {
        return [sum + group.length, "", false];
      }

      // No common answer, skip the next answers of this group.
      if (skip) {
        return [sum, group, true];
      }

      // New group.
      if (group.length === 0) {
        return [sum, ans, false];
      }

      // Check for common answers in this group.
      const commonAnswers = intersect(group, ans);
      return [sum, commonAnswers, commonAnswers.length === 0];
    },
    [0, "", false],
  )[0];
}

console.log(await firstStar());
console.log(await secondStar());

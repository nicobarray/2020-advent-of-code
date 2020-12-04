const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

type PassportField =
  | "byr"
  | "iyr"
  | "eyr"
  | "hgt"
  | "hcl"
  | "ecl"
  | "pid"
  | "cid";

function firstStar() {
  const mandatoryFields: PassportField[] = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
  ];
  let count = 0;
  let passport: Partial<Record<PassportField, string>> = {};
  for (let line of lines) {
    if (line.length === 0) {
      if (mandatoryFields.every((field) => Boolean(passport[field]))) {
        count++;
      }
      passport = {};
    } else {
      passport = line.split(" ").reduce((fields, field) => {
        const [key, value] = field.split(":");

        return ({
          ...fields,
          [key]: value,
        });
      }, passport);
    }
  }

  if (mandatoryFields.every((field) => Boolean(passport[field]))) {
    count++;
  }

  return count;
}

function secondStar() {
  function isValid(key: PassportField, value: string): boolean {
    switch (key) {
      case "byr":
        return Number(value) >= 1920 && Number(value) <= 2002;
      case "iyr":
        return Number(value) >= 2010 && Number(value) <= 2020;
      case "eyr":
        return Number(value) >= 2020 && Number(value) <= 2030;
      case "hgt":
        const x = Number(value.slice(0, value.length - 2));
        const unit = value.slice(value.length - 2);
        if (unit === "cm") {
          return Number(x) >= 150 && Number(x) <= 193;
        } else if (unit === "in") {
          return Number(x) >= 59 && Number(x) <= 76;
        } else {
          return false;
        }
      case "hcl":
        return /^#[0-9a-f]{6}$/.test(value);
      case "ecl":
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
          value,
        );
      case "pid":
        return /^[0-9]{9}$/.test(value);

      default:
        return true;
    }
  }

  const mandatoryFields: PassportField[] = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
  ];
  let count = 0;
  let passport: Partial<Record<PassportField, string>> = {};
  for (let line of lines) {
    if (line.length === 0) {
      if (mandatoryFields.every((field) => Boolean(passport[field]))) {
        count++;
      }
      passport = {};
    } else {
      passport = line.split(" ").reduce((fields, field) => {
        const [key, value] = field.split(":");

        if (!isValid(key as PassportField, value)) {
          return fields;
        }

        return ({
          ...fields,
          [key]: value,
        });
      }, passport);
    }
  }

  if (mandatoryFields.every((field) => Boolean(passport[field]))) {
    count++;
  }

  return count;
}

console.log(firstStar());
console.log(secondStar());

export {};

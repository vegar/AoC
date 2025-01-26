const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let [initial, rules] = input.split("\n\n");
[_, initial] = initial.split(": ");
rules = new Map(rules.split("\n").map((l) => l.split(" => ")));

console.log(rules);

const countPlants = (row, padding) =>
  row
    .split("")
    .reduce((count, curr, idx) => count + (curr == "#" ? idx - padding : 0), 0);

let prevCount = 0;
let prevDiff = 0;
let padStart = 3;
let iterations = 2000;
let prev = "..." + initial + "...";
let i = 0;
while (true) {
  let newRow = "";
  while (prev.substring(0, 2) != "..") {
    prev = "." + prev;
    padStart++;
  }

  while (prev.substring(prev.length - 3) != "...") prev += ".";

  for (let idx = 0; idx < prev.length; idx++) {
    let key = prev.substring(idx - 2, idx + 3);

    newRow = newRow + (rules.get(key) ?? ".");
  }
  let count = countPlants(newRow, padStart);
  let diff = count - prevCount;

  if (diff == prevDiff) {
    console.log(
      `Diff repeats at idx ${i}. Diff is ${diff}.  Current count == ${count}`
    );
    break;
  }

  i++;
  prevDiff = diff;
  prevCount = count;
  prev = newRow;
}

let result = prevCount + prevDiff * (50000000000 - i);
console.log({ result });

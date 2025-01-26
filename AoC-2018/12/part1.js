const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let [initial, rules] = input.split("\n\n");
[_, initial] = initial.split(": ");
rules = new Map(rules.split("\n").map((l) => l.split(" => ")));

console.log(rules);

const countPlants = (row) =>
  row
    .split("")
    .reduce((count, curr, idx) => count + (curr == "#" ? idx - 6 : 0), 0);

let iterations = 20;
let prev = "......" + initial + ".........................................";
for (let i = 0; i < iterations; i++) {
  console.log(`${i.toString().padStart(2, " ")}: ${prev}`);
  let newRow = "";
  for (let idx = 0; idx < prev.length; idx++) {
    let key = prev.substring(idx - 2, idx + 3);

    newRow = newRow + (rules.get(key) ?? ".");
  }
  prev = newRow;
}
console.log(`${iterations}: ${prev}`);

let result = countPlants(prev);
console.log({ result });

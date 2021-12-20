const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const stacks = [
  ["R", "G", "J", "B", "T", "V", "Z"],
  ["J", "R", "V", "L"],
  ["S", "Q", "F"],
  ["Z", "H", "N", "L", "F", "V", "Q", "G"],
  ["R", "Q", "T", "J", "C", "S", "M", "W"],
  ["S", "W", "T", "C", "H", "F"],
  ["D", "Z", "C", "V", "F", "N", "J"],
  ["L", "G", "Z", "D", "W", "R", "F", "Q"],
  ["J", "B", "W", "V", "P"],
];

for (let i = 0; i < input.length; i++) {
  const a = input[i].match(/move (\d*) from (\d*) to (\d*)/);
  if (a) {
    const [_, count, from, to] = a;
    for (let j = 0; j < count; j++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  }
}

let result = stacks.map((s) => s.pop()).join("");
console.log({ result });

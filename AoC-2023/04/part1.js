const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input-sample.txt"), "utf8")
  .trim();

let result = input.split("\n").reduce((acc, line) => {
  let points = 0;

  const [_, numbers] = line.split(":");
  const [winning, mine] = numbers.split("|");
  const winningSet = winning
    .trim()
    .split(/\s+/)
    .map((n) => n.trim())
    .reduce((set, num) => set.add(num), new Set());
  points = mine
    .trim()
    .split(/\s+/)
    .map((n) => n.trim())
    .reduce((acc, curr) => {
      return winningSet.has(curr) ? Math.max(acc * 2, 1) : acc;
    }, 0);

  console.log(winningSet, mine, points);
  return acc + points;
}, 0);
console.log({ result });

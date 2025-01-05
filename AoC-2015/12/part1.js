const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let result = Array.from(input.matchAll(/(-?\d+)/g), (m) => m[0])
  .map((d) => parseInt(d))
  .reduce((sum, curr) => sum + curr, 0);
console.log({ result });

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) =>
    Array.from(line.matchAll(/(\d+)/g), (m) => m[1])
      .map(Number)
      .sort((a, b) => a - b)
  );

let result = input.filter(([a, b, c]) => {
  return a + b > c;
}).length;
console.log({ result });

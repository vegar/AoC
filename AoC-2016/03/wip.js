const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => Array.from(line.matchAll(/(\d+)/g), (m) => m[1]).map(Number));

let possible = 0;
for (let i = 0; i < input.length; i += 3) {
  for (let j = 0; j < 3; j++) {
    const [a, b, c] = input
      .slice(i, i + 3)
      .map((row) => row[j])
      .sort((a, b) => a - b);
    if (a + b > c) {
      possible++;
    }
  }
}

let result = possible;
console.log({ result });

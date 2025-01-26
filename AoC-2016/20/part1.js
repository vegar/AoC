const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => l.split("-").map((n) => parseInt(n)))
  .sort((a, b) => a[0] - b[0]);

const c = [];
for (let [low, high] of input) {
  if (c.length == 0) {
    c.push([low, high]);
    continue;
  }

  let [plow, phigh] = c[c.length - 1];

  if (low <= phigh + 1) {
    c[c.length - 1][1] = Math.max(phigh, high);
  } else {
    c.push([low, high]);
  }
}

let result = c[0][1] + 1;
console.log({ result });

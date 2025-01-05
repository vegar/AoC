const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l, idx) => ({ id: idx, size: parseInt(l) }));

const cache = new Map();
const used = new Set();

const target = 150;

let result = 0;
for (let i = 1; i < Math.pow(2, input.length); i++) {
  let sum = 0;
  for (let k = 1; k <= input.length; k++) {
    let isSet = (i & (1 << (k - 1))) != 0;
    sum += input[k - 1].size * (isSet ? 1 : 0);
  }
  if (sum == target) result += 1;
}

console.log({ result });

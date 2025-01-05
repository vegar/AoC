const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => parseInt(l));

const mix = (a, b) => a ^ b;
const prune = (a, b) => a % BigInt(16777216);

const next = (num) => {
  let n = num;
  n = ((n << 6) ^ n) & 0xffffff;
  n = ((n >> 5) ^ n) & 0xffffff;
  n = ((n << 11) ^ n) & 0xffffff;
  return n;
};

let result = input.reduce((sum, num) => {
  let l = num;
  for (let x = 0; x < 2000; x++) l = next(l);

  return sum + l;
}, 0);

console.log({ result });

let input = require("fs")
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

//input = [123];

let monkeys = input.map((num) => {
  let l = num;
  let prices = [{ l: num, p: num % 10, c: undefined }];
  let seen = new Set();
  let seqToPrice = new Map();
  for (let x = 0; x < 2000; x++) {
    l = next(l);
    prices.push({
      l,
      p: l % 10,
      c: (l % 10) - prices.at(-1).p,
    });

    if (x > 2) {
      let key = `${prices.at(-4).c},${prices.at(-3).c},${prices.at(-2).c},${
        prices.at(-1).c
      }`;
      if (!seen.has(key)) {
        seqToPrice.set(key, prices.at(-1).p);
      }
      seen.add(key);
    }
  }

  return seqToPrice;
});

const allSequences = monkeys.reduce((all, m) => {
  for (let k of m.keys()) all.add(k);
  return all;
}, new Set());

let max = 0;
let maxseq = "";
allSequences.forEach((seq) => {
  let s = monkeys.reduce((sum, m) => {
    if (m.has(seq)) {
      sum += m.get(seq);
    }
    return sum;
  }, 0);
  if (s > max) {
    max = s;
    maxseq = seq;
  }
});

console.log(max, maxseq);
let result = max;

console.log({ result });

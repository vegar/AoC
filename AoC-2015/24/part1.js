const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map(Number)
  .sort((a, b) => b - a);

const sum = input.reduce((sum, curr) => sum + curr, 0);

const groupSize = sum / 3;

const results = [];

let minSize = Infinity;
let minQE = Infinity;

const makeSum = (start, items, target) => {
  if (target === 0) {
    if (items.length <= minSize) {
      minSize = items.length;
      let qe = items.reduce((sum, curr) => curr * sum, 1);
      if (qe < minQE) minQE = qe;
    }

    return;
  }

  for (let i = start; i < input.length; i++) {
    const num = input[i];
    if (num > target) continue;

    makeSum(i + 1, [...items, num], target - num);
  }
};

makeSum(0, [], groupSize);
console.log(results);
let result = minQE; //
console.log({ result });

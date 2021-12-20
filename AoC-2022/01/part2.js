const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

let max = 0;
const r = input
  .reduce(
    (acc, curr) => {
      let i = parseInt(curr);
      if (i) {
        acc[acc.length - 1] += i;
      } else {
        if (acc[acc.length - 1] > max) max = acc[acc.length - 1];
        acc.push(0);
      }
      return acc;
    },
    [0]
  )
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((acc, curr) => acc + curr);

let result = r;
console.log({ result });

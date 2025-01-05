const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .matchAll(/\d+/g);

let [row, col] = Array.from(input, (n) => parseInt(n[0]));

const nth = (row, col) => {
  return ((col + row) * (col + row - 1)) / 2 - row + 1;
};

const code = (nth) => {
  let code = 20151125;
  for (let i = 2; i <= nth; i++) code = (code * 252533) % 33554393;

  return code;
};

console.log(code(nth(4, 4)));

let result = code(nth(row, col));
console.log({ result });

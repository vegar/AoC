const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

result = input
  .split("\n")
  .map((line) => line.replaceAll(/[a-z]/g, ""))
  .map((digits) => {
    const d = digits.split("");
    const first = parseInt(d[0]);
    const last = parseInt(d.at(-1));
    return first * 10 + last;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ result });

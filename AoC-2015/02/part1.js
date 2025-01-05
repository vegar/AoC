const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

let result = input
  .map((l) => l.split("x").sort((a, b) => a - b))
  .map((pakke) => {
    const [w, h, l] = pakke;
    return w * h + (w * h + w * l + l * h) * 2;
  })
  .reduce((acc, curr) => acc + curr, 0);
console.log({ result });

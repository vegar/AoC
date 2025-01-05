const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

let result = input
  .map((l) =>
    l
      .split("x")
      .map((x) => parseInt(x, 10))
      .sort((a, b) => a - b)
  )
  .map((pakke) => {
    const [w, h, l] = pakke;
    return w + w + h + h + w * h * l;
  })
  .reduce((acc, curr) => acc + curr, 0);
console.log({ result });

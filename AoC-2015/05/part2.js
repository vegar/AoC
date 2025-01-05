const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

let result = input.filter((l) => {
  const double = l.match(/(..).*\1/);

  if (double) console.log(double);

  const repeat = l.match(/(.).\1/);

  return double && repeat;
});

console.log({ result: result.length });

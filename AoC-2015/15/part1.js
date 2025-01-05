const { text } = require("stream/consumers");

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => Array.from(line.match(/(-?\d+)/g), (d) => parseInt(d)));

let result = 0;
for (let x = 1; x < 101; x++)
  for (let y = 1; y + x < 101; y++)
    for (let z = 1; x + y + z < 101; z++)
      for (let a = 1; x + y + z + a < 101; a++) {
        let capacity =
          input[0][0] * x + input[1][0] * y + input[2][0] * z + input[3][0] * a;
        let durability =
          input[0][1] * x + input[1][1] * y + input[2][1] * z + input[3][1] * a;
        let flavor =
          input[0][2] * x + input[1][2] * y + input[2][2] * z + input[3][2] * a;
        let texture =
          input[0][3] * x + input[1][3] * y + input[2][3] * z + input[3][3] * a;

        let total =
          Math.max(0, capacity) *
          Math.max(0, durability) *
          Math.max(0, flavor) *
          Math.max(0, texture);
        if (total > result) result = total;
      }
console.log({ result });

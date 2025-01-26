const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => l.split("-").map((n) => parseInt(n)))
  .sort((a, b) => a[0] - b[0]);

let i = 1;
while (i < input.length) {
  if (input[i][0] < input[i - 1][1]) {
    input[i - 1][1] = Math.max(input[i][1], input[i - 1][1]);
    input.splice(i, 1);
  } else i++;
}

let count = 0;
for (let i = 1; i < input.length; i++) {
  let range = input[i][0] - input[i - 1][1] - 1;

  if (range < 0)
    console.log(`WHAT?? idx: ${i}, ${input[i - 1][1]}-${input[i][0]}`);
  count += range;
}

let result = count;
console.log({ result });

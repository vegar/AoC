const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const histories = input.split("\n").map((l) =>
  l
    .split(" ")
    .map((n) => parseInt(n))
    .reverse()
);

function delta(numbers) {
  if (numbers.every((c) => c == 0)) return 0;

  const d = [];
  for (var x = 1; x < numbers.length; x++) d.push(numbers[x] - numbers[x - 1]);
  return findNext(d);
}

function findNext(numbers) {
  console.log(`find next for ${numbers}`);
  return numbers.at(-1) + delta(numbers);
}

let result = histories.reduce((acc, curr) => acc + findNext(curr), 0);
console.log({ result });

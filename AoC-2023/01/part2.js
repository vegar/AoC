const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const textToDigit = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const regexp = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

result = input
  .split("\n")
  .map((line) => {
    const digits = [...line.matchAll(regexp)].map((x) => x[1]);
    return [digits[0], digits.at(-1)];
  })
  .map(([first, last]) => {
    console.log(first, last);
    const a = parseInt(first) || textToDigit[first];
    const b = parseInt(last) || textToDigit[last];
    return a * 10 + b;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ result });

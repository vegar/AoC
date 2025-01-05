const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input-sample.txt"), "utf8")
  .trim()
  .split("\n");

let result = input.filter((l) => {
  const vowels = [...l.matchAll(/[aeiou]/g)].length;
  const double = l.match(/(.)\1/);
  const bad = l.match(/ab|cd|pq|xy/);
  return !bad && vowels >= 3 && double;
}).length;

console.log({ result });

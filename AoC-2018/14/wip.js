const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let score = input.split("").map((c) => parseInt(c));
let recipes = new Array(5_000_000);
recipes[0] = 3;
recipes[1] = 7;
let length = 2;

let match = 0;

let elfs = [0, 1];

while (true) {
  let prevFirst = parseInt(recipes[elfs[0]]);
  let prevSecond = parseInt(recipes[elfs[1]]);

  let mix = prevFirst + prevSecond;
  let first = Math.floor(mix / 10);
  let second = mix % 10;

  if (first != 0) {
    recipes[length++] = first;
    if (first == score[match]) {
      match++;
      if (match == score.length) break;
    } else match = 0;
  }
  recipes[length++] = second;
  if (second == score[match]) {
    match++;
    if (match == score.length) break;
  } else match = 0;

  elfs = [
    (elfs[0] + 1 + prevFirst) % length,
    (elfs[1] + 1 + prevSecond) % length,
  ];
}
let result = length - score.length;
console.log({ result });

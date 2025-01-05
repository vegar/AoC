const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let [r, start] = input.split("\n\n");
const replacements = r.split("\n").map((line) => line.split(" => "));

const unique = new Set();
for (let [from, to] of replacements) {
  let i = 0;
  while (true) {
    i = start.indexOf(from, i + from.length);
    if (i < 0) break;

    unique.add(start.substring(0, i) + to + start.substring(i + from.length));
  }
}

let result = unique.size;
console.log({ result });

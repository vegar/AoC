const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("");

const expanded = input.flatMap((c, idx) => {
  return idx % 2 == 0
    ? Array(parseInt(c)).fill(Math.ceil(idx / 2))
    : Array(parseInt(c)).fill(".");
});

require("fs").writeFileSync("expanded.txt", expanded.join("\n"));

let last = expanded.length - 1;
let idx = 0;
while (idx < last) {
  if (expanded[idx] == ".") {
    while (expanded[last] == ".") last--;
    if (last <= idx) break;
    expanded[idx] = expanded[last];
    expanded[last] = ".";
    last--;
  }
  idx++;
}

console.log(expanded.slice(-10));
const compacted = expanded;
require("fs").writeFileSync("compacted.txt", expanded.join("\n"));
const checksum = compacted.reduce(
  (sum, curr, idx) => (curr == "." ? sum : sum + curr * idx),
  0
);

let result = checksum;
console.log({ result });

// tried: 6400828038148, 6401092024606

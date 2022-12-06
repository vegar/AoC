const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let result = 0;
for (let i = 0; i < input.length; i++) {
  let marker = new Set(input.substring(i, i + 14));

  if (marker.size == 14) {
    result = i + 14;
    break;
  }
}

console.log({ result });

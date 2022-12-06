const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let result = 0;
for (let i = 0; i < input.length; i++) {
  let marker = new Set(input.substring(i, i + 4));

  if (marker.size == 4) {
    result = i + 4;
    break;
  }
}

console.log({ result });

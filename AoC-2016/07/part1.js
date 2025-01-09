const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

let tls = input.filter((line) => {
  let bracket = false;
  let abba = false;
  for (let i = 0; i < line.length - 3; i++) {
    if (line[i] == "[") bracket = true;
    if (line[i] == "]") bracket = false;

    if (
      line[i] == line[i + 3] &&
      line[i + 1] == line[i + 2] &&
      line[i] != line[i + 1]
    ) {
      if (bracket) return false;
      abba = true;
    }
  }
  return abba;
});

let result = tls.length;
console.log({ result });

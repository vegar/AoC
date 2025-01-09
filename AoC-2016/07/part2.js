const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

let tls = input.filter((line) => {
  let bracket = false;
  let aba = new Set();
  let bab = new Set();
  for (let i = 0; i < line.length - 2; i++) {
    if (line[i] == "[") bracket = true;
    if (line[i] == "]") bracket = false;

    if (line[i] == line[i + 2] && line[i + 1] != "[" && line[i + 1] != "]") {
      if (bracket) bab.add(line.substring(i, i + 3));
      if (!bracket) aba.add(line.substring(i, i + 3));
    }
  }

  return [...aba.keys()].find((k) => bab.has(`${k[1]}${k[0]}${k[1]}`));
});

let result = tls.length;
console.log({ result });

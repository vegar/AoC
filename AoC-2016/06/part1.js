const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const a = "a".charCodeAt(0);

let msg = [];

for (let c = 0; c < input[0].length; c++) {
  let col = new Map();
  for (let r = 0; r < input.length; r++) {
    let char = input[r][c];
    col.set(char, (col.get(char) || 0) + 1);
  }

  let m = "";
  let max = 0;
  for (let e of col.entries()) {
    if (e[1] > max) {
      max = e[1];
      m = e[0];
    }
  }

  msg.push(m);
}

let result = msg.join("");
console.log({ result });

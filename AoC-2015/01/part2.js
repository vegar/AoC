const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("");

let position = 0;
input.reduce((etasje, tegn, index) => {
  if (tegn == "(") etasje = etasje + 1;
  else if (tegn == ")") etasje = etasje - 1;

  if (etasje < 0 && position == 0) {
    position = index + 1;
  }

  return etasje;
}, 0);
result = position;
console.log({ result });

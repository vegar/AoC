const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("");

let result = input.reduce((etasje, tegn) => {
  if (tegn == "(") etasje = etasje + 1;
  else if (tegn == ")") etasje = etasje - 1;

  return etasje;
}, 0);
console.log({ result });

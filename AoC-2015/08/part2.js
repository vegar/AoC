const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let total = line.length;
    let i = 0;
    let s = '"';
    while (i < total) {
      if (line[i] == '"') {
        s += '\\"';
      } else if (line[i] == "\\") {
        s += "\\\\";
      } else s += line[i];
      i++;
    }
    s += '"';
    console.log(line);
    console.log(s);
    return s.length - total;
  });

let result = input.reduce((sum, c) => (sum += c), 0);
console.log({ result });

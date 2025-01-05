const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let total = line.length;
    let i = 1;
    let c = 0;
    let s = "";
    while (i < total - 1) {
      if (line[i] == "\\") {
        if (line[i + 1] == "\\" || line[i + 1] == '"') i++;
        else i += 3;
      }
      s += line[i];
      c += 1;
      i++;
    }
    console.log(line);
    console.log(s);
    return total - c;
  });

let result = input.reduce((sum, c) => (sum += c), 0);
console.log({ result });

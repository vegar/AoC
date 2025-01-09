let input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const tokenize = (str) => {
  let i = 0;
  let p = 0;
  let parts = [];
  while (i < str.length) {
    if (str[i] == "(") {
      if (p < i) {
        parts.push({ str: str.substring(p, i), rep: 1, len: i - p });
      }
      let [m, sub, rep] = str.substring(i).match(/\((\d+)x(\d+)\)/);

      sub = parseInt(sub);
      rep = parseInt(rep);

      let newstr = str.substring(i + m.length, i + m.length + sub);

      parts.push({ str: newstr, rep: rep, parts: tokenize(newstr) });

      i = i + m.length + sub;
      p = i;
    } else {
      i++;
    }
  }
  if (p < i) {
    parts.push({ str: str.substring(p, i), rep: 1, len: i - p });
  }

  return parts;
};

const length = (node) => {
  if (!node.parts) {
    return node.len * node.rep;
  }

  let partLengths = node.parts.map((n) => length(n) * node.rep);
  return partLengths.reduce((sum, curr) => sum + curr, 0);
};

const start = { parts: tokenize(input), rep: 1 };

let result = length(start);
console.log({ result });

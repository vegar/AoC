const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const digits = input.split(/(\w)(?!\1)/);

const split = (input) => {
  let r = 1;
  let i = 1;
  let result = "";
  while (i < input.length) {
    if (input[i - 1] != input[i]) {
      result += `${r}${input[i - 1]}`;
      r = 0;
    }
    r += 1;
    i++;
  }
  result += `${r}${input[i - 1]}`;
  return result;
};

let str = input;
for (let i = 0; i < 40; i++) {
  str = split(str);
}

let result = str.length;
console.log({ result });

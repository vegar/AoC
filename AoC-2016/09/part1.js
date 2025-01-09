const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

console.log(input);

let i = 0;
let length = 0;
let decompressed = "";
while (i < input.length) {
  if (input[i] == "(") {
    console.log(i);
    let [m, x, y] = input.substring(i).match(/\((\d+)x(\d+)\)/);
    length += parseInt(x) * parseInt(y);
    decompressed += input
      .substring(i + m.length, i + m.length + parseInt(x))
      .repeat(parseInt(y));
    i += m.length + parseInt(x);
    console.log(m, i);
  } else {
    length++;

    decompressed += input[i];
    i++;
  }
}

let result = length;
console.log({ result });

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(" ")
  .map((l) => parseInt(l));

for (let b = 0; b < 25; b++) {
  let x = 0;
  while (x < input.length) {
    if (input[x] == 0) input[x] = 1;
    else if (input[x].toString().length % 2 == 0) {
      let s = input[x].toString();
      let half1 = s.substring(0, s.length / 2);
      let half2 = s.substring(s.length / 2);
      input.splice(x, 1, parseInt(half1), parseInt(half2));
      x++;
    } else {
      input[x] = input[x] * 2024;
    }
    x++;
  }
}

let result = input.length;
console.log({ result });

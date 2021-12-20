const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

let result = input
  .map((l) => {
    const [first, second] = [
      str.slice(0, l.length / 2),
      str.slice(l.length / 2),
    ];

    const [dup] = first.match(`[${second}]`);
    const val = dup.charCodeAt(0) - 96;

    return val < 0 ? val + 58 : val;
  })
  .reduce((acc, curr) => acc + curr);

console.log({ result });

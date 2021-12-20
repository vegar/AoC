const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

let result = input
  .map((l) => {
    const [first, second] = l.split(",");
    const [f1, f2] = first.split("-").map((n) => parseInt(n));
    const [s1, s2] = second.split("-").map((n) => parseInt(n));

    if (s1 >= f1 && s1 <= f2 && s2 >= f1 && s2 <= f2) {
      return 1;
    }
    if (f1 >= s1 && f1 <= s2 && f2 >= s1 && f2 <= s2) {
      return 1;
    }

    console.log(`${l}  => ${first} and ${second} doesn't overlap`);
    return 0;
  })
  .reduce((acc, curr) => acc + curr);
console.log({ result });

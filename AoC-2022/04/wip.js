const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

let result = input
  .map((l) => {
    const [first, second] = l.split(",");
    const [f1, f2] = first.split("-").map((n) => parseInt(n));
    const [s1, s2] = second.split("-").map((n) => parseInt(n));

    const firstSet = new Set();
    for (let i = f1; i <= f2; i++) {
      firstSet.add(i);
    }

    for (let j = s1; j <= s2; j++) {
      if (firstSet.has(j)) return 1;
    }

    return 0;
  })
  .reduce((acc, curr) => acc + curr);
console.log({ result });

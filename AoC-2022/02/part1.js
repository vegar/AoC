const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

//A X => rock
//B Y => paper
//C Z => scissor

const score = {
  A: (x) => (x == "X" ? 1 + 3 : x == "Y" ? 2 + 6 : 3 + 0),
  B: (x) => (x == "X" ? 1 + 0 : x == "Y" ? 2 + 3 : 3 + 6),
  C: (x) => (x == "X" ? 1 + 6 : x == "Y" ? 2 + 0 : 3 + 3),
};

const r = input
  .map((m) => {
    const [opponent, me] = m.split(" ");
    const s = score[opponent](me);

    return s;
  })
  .reduce((acc, curr) => acc + curr);

let result = r;
console.log({ result });

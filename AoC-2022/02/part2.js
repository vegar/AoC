const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

//A => rock     1
//B => paper    2
//C => scissor  3
//X => loose    0
//Y => draw     3
//Z => win      6

const score = {
  A: (x) => (x == "X" ? 3 + 0 : x == "Y" ? 1 + 3 : 2 + 6),
  B: (x) => (x == "X" ? 1 + 0 : x == "Y" ? 2 + 3 : 3 + 6),
  C: (x) => (x == "X" ? 2 + 0 : x == "Y" ? 3 + 3 : 1 + 6),
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

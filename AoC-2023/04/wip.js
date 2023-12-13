const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let cards = input.split("\n");
let cardCount = new Map(cards.map((_, idx) => [idx, 1]));

let result = cards.reduce((acc, line, idx) => {
  let points = 0;

  const [_, numbers] = line.split(":");
  const [winning, mine] = numbers.split("|");
  const winningSet = winning
    .trim()
    .split(/\s+/)
    .map((n) => n.trim())
    .reduce((set, num) => set.add(num), new Set());
  points = mine
    .trim()
    .split(/\s+/)
    .map((n) => n.trim())
    .reduce((acc, curr) => {
      return winningSet.has(curr) ? acc + 1 : acc;
    }, 0);

  for (let x = idx + 1; x <= idx + points; x++) {
    cardCount.set(x, cardCount.get(x) + 1 * cardCount.get(idx));
  }

  return acc + cardCount.get(idx);
}, 0);
console.log({ result });

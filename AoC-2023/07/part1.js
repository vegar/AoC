const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const cardValues = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

const groupRank = (groups) => {
  const keys = Object.keys(groups);
  if (keys.length == 1) return 7;
  if (keys.length == 2)
    return Object.keys(groups).some((c) => groups[c] == 4) ? 6 : 5;
  if (keys.length == 3)
    return Object.keys(groups).some((c) => groups[c] == 3) ? 4 : 3;
  if (keys.length == 4) return 2;
  return 1;
};

const hands = input
  .split("\n")
  .map((line) => {
    const [hand, bid] = line.split(" ");
    const cards = hand.split("");
    const groups = cards.reduce((acc, curr) => {
      return { ...acc, [curr]: acc[curr] ? acc[curr] + 1 : 1 };
    }, {});
    const rank = groupRank(groups);
    const values = cards.map((card) => cardValues[card] ?? parseInt(card));
    return { hand, bid, groups, rank, values };
  })
  .sort((hand1, hand2) => {
    let r = hand1.rank - hand2.rank;
    let idx = 0;
    while (r == 0) {
      r = hand1.values[idx] - hand2.values[idx];
      idx++;
    }
    return r;
  });

console.log(hands);

let result = hands.reduce(
  (acc, curr, idx) => acc + parseInt(curr.bid) * (idx + 1),
  0
);
console.log({ result });

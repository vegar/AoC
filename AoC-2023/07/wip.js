const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const cardValues = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
};

const valueOfCard = (card) => cardValues[card] ?? parseInt(card);

const groupRank = (groups) => {
  const keys = Object.keys(groups);
  const originalRank =
    keys.length == 1
      ? 7
      : keys.length == 2
      ? Object.keys(groups).some((c) => groups[c] == 4)
        ? 6
        : 5
      : keys.length == 3
      ? Object.keys(groups).some((c) => groups[c] == 3)
        ? 4
        : 3
      : keys.length == 4
      ? 2
      : 1;
  if (groups["J"]) {
    const bestGroup = keys
      .filter((k) => k != "J")
      .sort((a, b) => groups[b] - groups[a] || valueOfCard(b) - valueOfCard(a))
      .at(0);

    const newGroups = { ...groups };
    newGroups[bestGroup] = groups[bestGroup] + groups["J"];
    delete newGroups.J;
    const newRank = groupRank(newGroups);

    return newRank;
  }
  return originalRank;
};

const hands = input
  .split("\n")
  .map((line) => {
    const [hand, bid] = line.split(" ");
    if (hand == "K2JAJ") debugger;
    const cards = hand.split("");
    const groups = cards.reduce((acc, curr) => {
      return { ...acc, [curr]: acc[curr] ? acc[curr] + 1 : 1 };
    }, {});
    const value = groupRank(groups);
    const values = cards.map(valueOfCard);
    return { hand, bid, groups, value, values };
  })
  .sort((hand1, hand2) => {
    let r = hand1.value - hand2.value;
    let idx = 0;
    while (r == 0) {
      r = hand1.values[idx] - hand2.values[idx];
      idx++;
    }
    return r;
  })
  .map((hand, idx) => ({ ...hand, rank: idx + 1 }));

let result = hands.reduce(
  (acc, curr) => acc + parseInt(curr.bid) * curr.rank,
  0
);
console.log({ result });

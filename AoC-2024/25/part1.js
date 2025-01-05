const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n\n");

const { keys, locks } = input.reduce(
  (acc, curr) => {
    const [first, ...rest] = curr.split("\n");
    const isLock = first.match(/^#+$/);

    const cols = [];
    for (let x = 0; x < first.length; x++) {
      let col = 0;
      for (let y = 0; y < rest.length - 1; y++) if (rest[y][x] == "#") col++;
      cols.push(col);
    }

    acc[isLock ? "locks" : "keys"].push(cols);
    return acc;
  },
  {
    keys: [],
    locks: [],
  }
);

console.log(keys, locks);

const matches = [];
for (let key of keys) {
  for (let lock of locks) {
    let m = key.every((v, idx) => v + lock[idx] <= 5);
    if (m) matches.push({ key, lock });
  }
}

let result = matches.length;
console.log({ result });

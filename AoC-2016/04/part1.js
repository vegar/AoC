const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

const rooms = input.map((line) => {
  let [_, name, sector, checksum] = line.match(/(.+)-(\d+)\[(.+)\]/);
  let letters = new Map();
  for (let letter of name) {
    if (letter === "-") continue;
    letters.set(letter, (letters.get(letter) || 0) + 1);
  }
  let sorted = [...letters.entries()].sort((a, b) => {
    if (a[1] === b[1]) return a[0].localeCompare(b[0]);
    return b[1] - a[1];
  });
  let calculatedChecksum = sorted
    .slice(0, 5)
    .map((a) => a[0])
    .join("");
  return calculatedChecksum == checksum ? Number(sector) : 0;
});

let result = rooms.reduce((acc, curr) => acc + curr, 0);
console.log({ result });

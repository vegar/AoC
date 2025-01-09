const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

const rooms = input
  .map((line) => {
    let [_, name, sector, checksum] = line.match(/(.+)-(\d+)\[(.+)\]/);
    return { name, sector: Number(sector), checksum };
  })
  .filter(({ name, sector, checksum }) => {
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
  })
  .map(({ name, sector }) => {
    let decrypted = name
      .split("")
      .map((letter) => {
        if (letter === "-") return " ";
        return String.fromCharCode(
          ((letter.charCodeAt(0) - 97 + sector) % 26) + 97
        );
      })
      .join("");
    return { name: decrypted, sector };
  });

console.log({ rooms });
let result = rooms.find(({ name }) => name.includes("north")).sector;
console.log({ result });

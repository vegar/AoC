const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((line) => line.split(""));

const { symbols, numbers } = input.split("\n").reduce(
  ({ symbols, numbers }, line, lineNumber) => {
    const matches = [...line.matchAll(/(?<num>\d+)|(?<sym>[^\d^\.])/g)].forEach(
      (m) => {
        const d = m.groups.num ? numbers : symbols;
        d.set(`${m.index}:${lineNumber}`, m[0]);
      }
    );

    return { symbols, numbers };
  },
  { symbols: new Map(), numbers: new Map() }
);

const isPartNumber = (coord, number) => {
  const [x, y] = coord.split(":").map((i) => parseInt(i));

  for (let xx = x - 1; xx <= x + number.length; xx++)
    for (let yy = y - 1; yy <= y + 1; yy++)
      if (symbols.has(`${xx}:${yy}`)) return true;

  return false;
};

let result = [...numbers.entries()]
  .filter(([coord, number]) => isPartNumber(coord, number))
  .reduce((acc, [coord, number]) => acc + parseInt(number), 0);

console.log({ result });

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((line) => line.split(""));

const { gears, numbers } = input.split("\n").reduce(
  ({ gears, numbers }, line, lineNumber) => {
    const matches = [...line.matchAll(/(?<num>\d+)|(?<sym>[^\d^\.])/g)].forEach(
      (m) => {
        if (m.groups.num) {
          numbers.set(`${m.index}:${lineNumber}`, m[0]);
        }
        if (m.groups.sym == "*")
          gears.set(`${m.index}:${lineNumber}`, new Set());
      }
    );

    return { gears, numbers };
  },
  { gears: new Map(), numbers: new Map() }
);

const isPartNumber = (coord, number) => {
  const [x, y] = coord.split(":").map((i) => parseInt(i));

  for (let xx = x - 1; xx <= x + number.length; xx++)
    for (let yy = y - 1; yy <= y + 1; yy++)
      if (gears.has(`${xx}:${yy}`)) {
        gears.get(`${xx}:${yy}`).add(parseInt(number));
      }
};

[...numbers.entries()].forEach(([coord, number]) =>
  isPartNumber(coord, number)
);

let result = [...gears.entries()]
  .filter(([gear, numbers]) => numbers.size == 2)
  .reduce(
    (acc, [gear, numbers]) =>
      acc + [...numbers.keys()].reduce((acc, curr) => acc * curr, 1),
    0
  );
console.log({ result });

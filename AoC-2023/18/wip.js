const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

const directions = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const directionsAlfa = {
  R: { x: 1, y: 0 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: -1 },
};

const { points, bounds } = input.reduce(
  ({ points, bounds }, current) => {
    let [_, direction, length, color] = current.match(
      /(\w) (\d+) (\(#[0-9a-f]+\))/
    );

    length = parseInt(color.substring(2, 7), 16);
    let dir = directions[parseInt(color.at(-2))];

    let prev = points.at(-1);
    points.push({ x: prev.x + dir.x * length, y: prev.y + dir.y * length });
    return { points, bounds: bounds + length };
  },
  { points: [{ x: 0, y: 0 }], bounds: 0 }
);

const shoelace = (points, bounds) => {
  let a = Math.abs(
    points.reduce((sum, curr, idx) => {
      let previousY = points.at(idx - 1).y;
      let nextY = points.at((idx + 1) % points.length).y;

      return sum + curr.x * (previousY - nextY);
    }, 0) / 2
  );

  let i = a - Math.floor(bounds / 2) + 1;
  return i + bounds;
};

console.log(shoelace(points, bounds));
let result = 0;
console.log({ result });

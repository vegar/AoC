const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const sample = false;

const fav = sample ? 10 : parseInt(input);
const goal = sample ? [7, 4] : [31, 39];

const space = (x, y) => {
  let f = x * x + 3 * x + 2 * x * y + y + y * y + fav;
  let bits = f
    .toString(2)
    .split("")
    .filter((b) => b == "1").length;

  return bits % 2 == 0;
};

const draw = (width, height, seen) => {
  console.clear();
  for (let y = 0; y < height; y++) {
    if (y == 0) {
      console.log(
        "  " +
          Array(42)
            .fill(0)
            .map((v, idx) => idx % 10)
            .join("")
      );
    }

    let row = "" + (y % 10) + " ";
    for (let x = 0; x < width; x++) {
      row += seen.has(`${x}:${y}`)
        ? "."
        : x == goal[0] && y == goal[1]
        ? "0"
        : space(x, y)
        ? " "
        : "#";
    }
    console.log(row);
  }
};

let queue = [[1, 1, 0, []]];
let seen = new Map();
let minSteps = Infinity;
while (queue.length > 0) {
  let [x, y, steps, path] = queue.shift();

  if (x == 32 && y == 39) debugger;
  if (x == goal[0] && y == goal[1]) {
    minSteps = Math.min(minSteps, steps);
    break;
  }

  if (seen.has(`${x}:${y}`) && seen.get(`${x}:${y}`) < steps) continue;

  seen.set(`${x}:${y}`, steps);

  if (space(x + 1, y)) queue.push([x + 1, y, steps + 1, [...path, [x, y]]]);
  if (space(x, y + 1)) queue.push([x, y + 1, steps + 1, [...path, [x, y]]]);
  if (space(x, y - 1)) queue.push([x, y - 1, steps + 1, [...path, [x, y]]]);
  if (space(x - 1, y)) queue.push([x - 1, y, steps + 1, [...path, [x, y]]]);
}

draw(50, 50, seen);

let result = minSteps;
console.log({ result });

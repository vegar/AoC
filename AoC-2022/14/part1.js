const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const stones = new Set();
let maxy = 0;
input.map((line) =>
  line
    .split("->")
    .map((coord) => coord.split(",").map((x) => parseInt(x)))
    .reduce((prev, curr) => {
      const [x1, y1] = prev;
      const [x2, y2] = curr;

      if (x1 == x2) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          stones.add(`${y}:${x1}`);
        }
      }
      if (y1 == y2) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          stones.add(`${y1}:${x}`);
        }
      }

      maxy = Math.max(maxy, y1, y2);

      return curr;
    })
);

console.log(stones);
console.log({ maxy });

function simulate() {
  let sand = { y: 0, x: 500 };
  while (true) {
    if (!stones.has(`${sand.y + 1}:${sand.x}`)) sand.y += 1;
    else if (!stones.has(`${sand.y + 1}:${sand.x - 1}`)) {
      sand.y += 1;
      sand.x -= 1;
    } else if (!stones.has(`${sand.y + 1}:${sand.x + 1}`)) {
      sand.y += 1;
      sand.x += 1;
    } else {
      stones.add(`${sand.y}:${sand.x}`);
      break;
    }

    if (sand.y > maxy) {
      return false;
    }
  }
  return true;
}

let round = 0;
while (simulate()) round++;

let result = round;
console.log({ result });

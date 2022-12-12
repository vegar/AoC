const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/)
  .map((l) => l.split("").map((x) => parseInt(x)));

const visible = new Map();

const set = (x, y, v) => visible.set(`${x}:${y}`, v);
const height = (x, y) => input[y][x];

const scenicScore = (x, y) => {
  let right = 0;
  let xx = x + 1;
  while (xx < input[y].length) {
    right++;
    if (height(xx, y) >= height(x, y)) break;
    xx++;
  }

  let left = 0;
  xx = x - 1;
  while (xx >= 0) {
    left++;
    if (height(xx, y) >= height(x, y)) break;
    xx--;
  }

  let up = 0;
  yy = y - 1;
  while (yy >= 0) {
    up++;
    if (height(x, yy) >= height(x, y)) break;
    yy--;
  }

  let down = 0;
  yy = y + 1;
  while (yy < input.length) {
    down++;
    if (height(x, yy) >= height(x, y)) break;
    yy++;
  }

  return left * right * up * down;
};

scenicScore(2, 3);

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    set(x, y, scenicScore(x, y));
  }
}

let result = Math.max(...visible.values());
console.log({ result });

const WIDE = 101;
const TALL = 103;
const SEC = 100;

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => {
    const [x, y, dx, dy] = [...l.matchAll(/(-{0,1}\d+)/g)].map((m) =>
      parseInt(m[0])
    );
    let newX = (x + dx * SEC) % WIDE;
    let newY = (y + dy * SEC) % TALL;
    return {
      x: newX < 0 ? newX + WIDE : newX,
      y: newY < 0 ? newY + TALL : newY,
      dx,
      dy,
    };
  });

const MIDX = Math.floor(WIDE / 2);
const MIDY = Math.floor(TALL / 2);

console.log({ MIDX, MIDY });
let count = input.reduce(
  (q, curr) => {
    if (curr.x == MIDX || curr.y == MIDY) return q;

    let x = curr.x < MIDX ? 0 : 1;
    let y = curr.y < MIDY ? 0 : 1;

    console.log({ x, y, q: x + y * 2 });
    q[x + y * 2] += 1;
    return q;
  },
  [0, 0, 0, 0]
);

let result = count.reduce((sum, curr) => sum * curr, 1);
console.log({ result });

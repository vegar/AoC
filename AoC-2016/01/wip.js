let input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const route = input.split(", ").map((a) => {
  let [turn, ...steps] = a.split("");
  return [turn, parseInt(steps.join(""))];
});

const turn = {
  L: (dx, dy) => ({
    dx: dy != 0 ? (dy < 0 ? -1 : 1) : 0,
    dy: dx != 0 ? (dx < 0 ? 1 : -1) : 0,
  }),
  R: (dx, dy) => ({
    dx: dy != 0 ? (dy < 0 ? 1 : -1) : 0,
    dy: dx != 0 ? (dx < 0 ? -1 : 1) : 0,
  }),
};

let path = new Set();
let firstPos = null;

route.reduce(
  (pos, [t, s]) => {
    let { dx, dy } = turn[t](pos.dx, pos.dy);

    let newpos = pos;
    for (let i = 1; i <= s; i++) {
      newpos = { x: pos.x + dx * i, y: pos.y + dy * i, dx, dy };
      if (path.has(`${newpos.x},${newpos.y}`) && !firstPos) {
        firstPos = newpos;
      }
      path.add(`${newpos.x},${newpos.y}`);
    }
    return newpos;
  },
  { x: 0, y: 0, dx: 0, dy: -1 }
);

let result = Math.abs(firstPos.x) + Math.abs(firstPos.y);
console.log({ result });

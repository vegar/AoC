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

let pos = route.reduce(
  (pos, [t, s]) => {
    let { dx, dy } = turn[t](pos.dx, pos.dy);
    let newpos = { x: pos.x + s * dx, y: pos.y + s * dy, dx, dy };
    console.log(t, s, newpos);
    return newpos;
  },
  { x: 0, y: 0, dx: 0, dy: -1 }
);
let result = Math.abs(pos.x) + Math.abs(pos.y);
console.log({ result });

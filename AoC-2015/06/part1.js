const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => {
    const [_, command, x, y, xx, yy] = l.match(
      /(toggle|turn off|turn on) (\d+),(\d+) through (\d+),(\d+)/
    );
    return {
      command,
      x: parseInt(x),
      xx: parseInt(xx),
      y: parseInt(y),
      yy: parseInt(yy),
    };
  });

const lights = new Array(1000).fill(null).map((r) => Array(1000).fill(false));

const command = {
  toggle: (x, y) => (lights[y][x] = !lights[y][x]),
  "turn on": (x, y) => (lights[y][x] = true),
  "turn off": (x, y) => (lights[y][x] = false),
};

const execute = (instruction) => {
  for (let x = instruction.x; x <= instruction.xx; x++)
    for (let y = instruction.y; y <= instruction.yy; y++)
      command[instruction.command](x, y);
};

input.forEach((i) => execute(i));

let result = lights.reduce(
  (sum, y) => sum + y.reduce((sum, x) => (sum += x ? 1 : 0)),
  0
);
console.log({ result });

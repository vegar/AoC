const { dir } = require("console");

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

console.log(input);

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const move = (pos, direction) => {
  switch (direction) {
    case "U":
      pos[0] = Math.max(0, pos[0] - 1);
      break;
    case "D":
      pos[0] = Math.min(2, pos[0] + 1);
      break;
    case "L":
      pos[1] = Math.max(0, pos[1] - 1);
      break;
    case "R":
      pos[1] = Math.min(2, pos[1] + 1);
      break;
  }
  return pos;
};

let pos = [1, 1];

const buttons = [];

input.reduce((pos, line) => {
  let newPos = line.reduce((pos, dir) => move(pos, dir), pos);
  buttons.push(keypad[newPos[0]][newPos[1]]);
  return newPos;
}, pos);

let result = buttons.join("");
console.log({ result });

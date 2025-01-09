const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const keypad = [
  [0, 0, 1, 0, 0],
  [0, 2, 3, 4, 0],
  [5, 6, 7, 8, 9],
  [0, "A", "B", "C", 0],
  [0, 0, "D", 0, 0],
];

const move = (pos, direction) => {
  let newPos = [...pos];
  switch (direction) {
    case "U":
      newPos[0] = Math.max(0, pos[0] - 1);
      break;
    case "D":
      newPos[0] = Math.min(keypad.length - 1, pos[0] + 1);
      break;
    case "L":
      newPos[1] = Math.max(0, pos[1] - 1);
      break;
    case "R":
      newPos[1] = Math.min(keypad.length - 1, pos[1] + 1);
      break;
  }
  if (keypad[newPos[0]][newPos[1]] === 0) {
    return pos;
  }
  return newPos;
};

let pos = [2, 0];

const buttons = [];

input.reduce((pos, line) => {
  let newPos = line.reduce((pos, dir) => move(pos, dir), pos);
  buttons.push(keypad[newPos[0]][newPos[1]]);
  return newPos;
}, pos);

let result = buttons.join("");
console.log({ result });

const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split("\n")
  .map(m => m.split(""));

let result = 0

const forward = (x, y) => {
  try {
    return input[y][x] == "X" && input[y][x + 1] == "M" && input[y][x + 2] == "A" && input[y][x + 3] == "S" ? 1 : 0;
  } catch (error) {
    return 0;
  }
}
const backward = (x, y) => {
  try {

    return input[y][x] == "X" && input[y][x - 1] == "M" && input[y][x - 2] == "A" && input[y][x - 3] == "S" ? 1 : 0;
  } catch (error) {
    return 0
  }
}
const up = (x, y) => {
  try {
    return input[y][x] == "X" && input[y - 1][x] == "M" && input[y - 2][x] == "A" && input[y - 3][x] == "S" ? 1 : 0;
  } catch (error) {
    return 0
  }
}
const down = (x, y) => {
  try {

    return input[y][x] == "X" && input[y + 1][x] == "M" && input[y + 2][x] == "A" && input[y + 3][x] == "S" ? 1 : 0;
  } catch (error) {
    return 0;
  }
}
const downright = (x, y) => {
  try {

    return input[y][x] == "X" && input[y + 1][x + 1] == "M" && input[y + 2][x + 2] == "A" && input[y + 3][x + 3] == "S" ? 1 : 0;
  } catch (error) {
    return 0;
  }
}
const downleft = (x, y) => {
  try {

    return input[y][x] == "X" && input[y + 1][x - 1] == "M" && input[y + 2][x - 2] == "A" && input[y + 3][x - 3] == "S" ? 1 : 0;
  } catch (error) {
    return 0
  }
}
const upright = (x, y) => {
  try {
    return input[y][x] == "X" && input[y - 1][x + 1] == "M" && input[y - 2][x + 2] == "A" && input[y - 3][x + 3] == "S" ? 1 : 0;
  } catch (error) {
    return 0;
  }
}
const upleft = (x, y) => {
  try {
    return input[y][x] == "X" && input[y - 1][x - 1] == "M" && input[y - 2][x - 2] == "A" && input[y - 3][x - 3] == "S" ? 1 : 0;
  } catch (error) {
    return 0;
  }
}

for (let x = 0; x < input[0].length; x++) {
  for (let y = 0; y < input.length; y++) {

    result += forward(x, y);
    result += backward(x, y);
    result += up(x, y)
    result += down(x, y)
    result += downright(x, y)
    result += downleft(x, y)
    result += upright(x, y)
    result += upleft(x, y)
  }
}

console.log({ result })

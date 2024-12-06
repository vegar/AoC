
const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split("\n")
  .map(m => m.split(""));

let result = 0


const horizontal = (x, y) => {
  try {
    return (input[y][x - 1] == "M" && input[y][x + 1] == "S") ||
      (input[y][x - 1] == "S" && input[y][x + 1] == "M")
  } catch (error) {
    return false;
  }
}
const vertical = (x, y) => {
  try {
    return (input[y - 1][x] == "M" && input[y + 1][x] == "S") ||
      (input[y - 1][x] == "S" && input[y + 1][x] == "M")
  } catch (error) {
    return false;
  }
}

const diagonal = (x, y) => {
  try {
    return (input[y - 1][x - 1] == "M" && input[y + 1][x + 1] == "S") ||
      (input[y - 1][x - 1] == "S" && input[y + 1][x + 1] == "M")
  } catch (error) {
    return false;
  }
}

const diagonal2 = (x, y) => {
  try {
    return (input[y - 1][x + 1] == "M" && input[y + 1][x - 1] == "S") ||
      (input[y - 1][x + 1] == "S" && input[y + 1][x - 1] == "M")
  } catch (error) {
    return false;
  }
}

const match = [];

for (let x = 1; x < input[0].length - 1; x++) {
  for (let y = 1; y < input.length - 1; y++) {

    if (input[y][x] == "A") {
      // if (horizontal(x, y) && vertical(x, y)) {
      //   match.push({ x, y, dir: 'horizontal' })
      //   result++
      // }

      if (diagonal(x, y) && diagonal2(x, y)) {
        match.push({ x, y, dir: 'cross' })
        result++
      }
    }
  }
}

console.log({ result })

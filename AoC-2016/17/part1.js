const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

const crypto = require("crypto");



const hash = (passcode, path) => {
  let k = crypto.createHash("md5").update(`${passcode}${path}`).digest("hex");
  let [up, down, left, right] = k.substring(0, 4).split('').map(c => c.match(/[bcdef]/) != null);

  return [up, down, left, right];
}

const size = 4;

const delta = [
  (x, y) => [x, y - 1],
  (x, y) => [x, y + 1],
  (x, y) => [x - 1, y],
  (x, y) => [x + 1, y]
];

const dir = ['U', 'D', 'L', 'R'];

const solve = (passcode) => {
  let queue = [[0, 0, 0, '']]

  while (queue.length > 0) {
    let [x, y, steps, path] = queue.shift();

    if (x == size - 1 && y == size - 1) {
      return path;
    }

    let doors = hash(passcode, path);
    for (let [idx, open] of doors.entries()) {
      let [dx, dy] = delta[idx](x, y);
      if (open && dx >= 0 && dx < size && dy >= 0 && dy < size) {
        queue.push([dx, dy, steps + 1, path + dir[idx]])
      }
    }
  }
  return '';
}

let result = solve(input)
console.log({ result })

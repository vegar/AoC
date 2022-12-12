const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/)
  .map((l) => l.split("").map((x) => parseInt(x)));

const visible = new Set();

for (let y = 0; y < input.length; y++) {
  const line = input[y];
  let max = -1;
  for (let x = 0; x < line.length; x++) {
    if (line[x] > max) {
      visible.add(`${x}:${y}-${line[x]}`);
      max = line[x];
    }
  }

  max = -1;
  for (let x = line.length - 1; x >= 0; x--) {
    if (line[x] > max) {
      visible.add(`${x}:${y}-${line[x]}`);
      max = line[x];
    }
  }
}

for (let x = 0; x < input[0].length; x++) {
  let max = -1;
  for (let y = 0; y < input.length; y++) {
    if (input[y][x] > max) {
      visible.add(`${x}:${y}-${input[y][x]}`);
      max = input[y][x];
    }
  }

  max = -1;
  for (let y = input[0].length - 1; y >= 0; y--) {
    if (input[y][x] > max) {
      visible.add(`${x}:${y}-${input[y][x]}`);
      max = input[y][x];
    }
  }
}

let result = visible.size;
console.log({ result });

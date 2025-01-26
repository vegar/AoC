const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .slice(2)
  .map((line) => {
    let [name, size, used, avail, use] = line.split(/\s+/);

    let [_, x, y] = name.match(/-x(\d+)-y(\d+)/);

    return {
      name,
      size: parseInt(size),
      used: parseInt(used),
      avail: parseInt(avail),
      use: parseInt(use),
      x: parseInt(x),
      y: parseInt(y),
    };
  });

const highX = input.reduce((m, c) => (c.x > m ? c.x : m), 0);
const highY = input.reduce((m, c) => (c.y > m ? c.y : m), 0);
const empty = input.find((n) => n.use == 0);
console.log({ highX, highY, empty });

let map = Array(highY + 1)
  .fill("")
  .map((_) => Array(highX).fill("."));

for (let { used, x, y } of input) {
  map[y][x] =
    used == 0
      ? "_"
      : used > 100
      ? "#"
      : x == 0 && y == 0
      ? "!"
      : x == highX && y == 0
      ? "G"
      : ".";
}

map.forEach((row) => console.log(row.join("")));

let result = 0;
console.log({ result });

//981 to low

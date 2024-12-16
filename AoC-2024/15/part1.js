const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(`\n\n`);

const map = input[0].split("\n").map((l) => l.split(""));
const movement = input[1].replaceAll("\n", "").split("");

const findStart = () => {
  for (let yy = 0; yy < map.length; yy++) {
    for (let xx = 0; xx < map[yy].length; xx++) {
      if (map[yy][xx] == "@") {
        return [xx, yy];
      }
    }
  }
};

const moveMap = {
  [`<`]: [-1, 0],
  [">"]: [1, 0],
  ["v"]: [0, 1],
  ["^"]: [0, -1],
};

const canMove = (x, y, dir) => {
  const [dx, dy] = moveMap[dir];
  if (map[y + dy][x + dx] == "#") return false;
  if (map[y + dy][x + dx] == ".") return true;
  if (map[y + dy][x + dx] == "O") return canMove(x + dx, y + dy, dir);
};

const move = (x, y, dir) => {
  const [dx, dy] = moveMap[dir];
  if (canMove(x, y, dir)) {
    if (map[y + dy][x + dx] == "O") move(x + dx, y + dy, dir);
    map[y + dy][x + dx] = map[y][x];
    map[y][x] = ".";
    return true;
  }
  return false;
};

let [x, y] = findStart();
for (let dir of movement) {
  if (move(x, y, dir)) {
    let [dx, dy] = moveMap[dir];
    x += dx;
    y += dy;
  }
}

map.forEach((l) => console.log(l.join("")));

let result = 0;
for (let y = 0; y < map.length; y++)
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] == "O") result = result + y * 100 + x;
  }

console.log({ result });

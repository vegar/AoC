const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((line) => line.split(""));

const starty = map.findIndex((row) => row.indexOf("S") >= 0);
const startx = map[starty].indexOf("S");

const garden = new Set();

const visit = (y, x) => {
  console.log(y, x);
  if (
    x >= 0 &&
    x < map[0].length &&
    y >= 0 &&
    y < map.length &&
    map[(y, x)] != "#"
  )
    map[y][x] = "O";
};

const inside = (y, x) => {
  return y >= 0 && y <= map.length && x >= 0 && x <= map[0].length;
};

const key = (y, x) => `${y}:${x}`;
const steps = 64;
let start = new Set([key(starty, startx)]);
for (let step = 0; step < steps; step++) {
  let next = new Set();
  start.forEach((value) => {
    let [y, x] = value.split(":").map((i) => parseInt(i));
    if (inside(y, x + 1) && map[y][x + 1] != "#") next.add(key(y, x + 1));
    if (inside(y, x - 1) && map[y][x - 1] != "#") next.add(key(y, x - 1));
    if (inside(y + 1, x) && map[y + 1][x] != "#") next.add(key(y + 1, x));
    if (inside(y - 1, x) && map[y - 1][x] != "#") next.add(key(y - 1, x));
  });
  start = next;
}

start.forEach((value) => {
  let [y, x] = value.split(":").map((i) => parseInt(i));
  map[y][x] = "O";
});

const logMap = () => {
  map.forEach((row) => console.log(row.join("")));
};

logMap(map);
//console.log(garden);
let result = start.size;
console.log({ result });

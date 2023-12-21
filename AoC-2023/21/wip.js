const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((line) => line.split(""));

const starty = map.findIndex((row) => row.indexOf("S") >= 0);
const startx = map[starty].indexOf("S");

const get = (y, x) => {
  try {
    // let yy = y;
    // let xx = x;
    // while (yy < 0) yy += map.length;
    // while (xx < 0) xx += map[0].length;
    // while (yy >= map.length) yy -= map.length;
    // while (xx >= map[0].length) xx -= map[0].length;

    return map[y][x];
  } catch (error) {
    console.error(`Failed at reading [${y}][${x}]`);
  }
};

const key = (y, x) => `${y}:${x}`;
const inside = (y, x) => {
  return y >= 0 && y < map.length && x >= 0 && x < map[0].length;
};
const steps = 26501365;

const count = (starty, startx, steps) => {
  let start = [[starty, startx, steps]];
  let visited = new Set([key(starty, startx)]);
  let answer = new Set();
  while (start.length > 0) {
    let [y, x, steps] = start.shift();
    if (steps % 2 == 0) answer.add(key(y, x));
    if (steps == 0) continue;

    [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ].forEach(([ny, nx]) => {
      if (inside(ny, nx) && get(ny, nx) != "#" && !visited.has(key(ny, nx))) {
        visited.add(key(ny, nx));
        start.push([ny, nx, steps - 1]);
      }
    });
  }

  return answer.size;
};

let grid_width = Math.floor(steps / map.length) - 1;
let odd_grids = Math.pow(Math.floor(grid_width / 2) * 2 + 1, 2);
let even_grids = Math.pow(Math.floor((grid_width + 1) / 2) * 2, 2);

console.log({ odd_grids, even_grids });
let odd_count = count(starty, startx, map.length * 2 + 1);
let even_count = count(starty, startx, map.length * 2);

console.log(even_count, odd_count);

let top_corner = count(0, startx, map.length - 1);
let bottom_corner = count(map.length - 1, startx, map.length - 1);
let left_corner = count(starty, map.length - 1, map.length - 1);
let right_corner = count(starty, 0, map.length - 1);

console.log(top_corner, bottom_corner, left_corner, right_corner);

let topright_small_corner = count(
  map.length - 1,
  0,
  Math.floor(map.length / 2) - 1
);
let topleft_small_corner = count(
  map.length - 1,
  map.length - 1,
  Math.floor(map.length / 2) - 1
);
let bottomright_small_corner = count(0, 0, Math.floor(map.length / 2) - 1);
let bottomleft_small_corner = count(
  0,
  map.length - 1,
  Math.floor(map.length / 2) - 1
);

console.log(
  topright_small_corner,
  topleft_small_corner,
  bottomright_small_corner,
  bottomleft_small_corner
);

let topright_large_corner = count(
  map.length - 1,
  0,
  Math.floor((map.length * 3) / 2) - 1
);
let topleft_large_corner = count(
  map.length - 1,
  map.length - 1,
  Math.floor((map.length * 3) / 2) - 1
);
let bottomright_large_corner = count(
  0,
  0,
  Math.floor((map.length * 3) / 2) - 1
);
let bottomleft_large_corner = count(
  0,
  map.length - 1,
  Math.floor((map.length * 3) / 2) - 1
);

console.log(
  topright_large_corner,
  topleft_large_corner,
  bottomright_large_corner,
  bottomleft_large_corner
);

//console.log(garden);
let result =
  odd_count * odd_grids +
  even_count * even_grids +
  top_corner +
  bottom_corner +
  left_corner +
  right_corner +
  (grid_width + 1) *
    (topleft_small_corner +
      topright_small_corner +
      bottomleft_small_corner +
      bottomright_small_corner) +
  grid_width *
    (topleft_large_corner +
      topright_large_corner +
      bottomleft_large_corner +
      bottomright_large_corner);
console.log({ result });

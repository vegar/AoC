const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let [x, y, dx, dy] = line.match(/([-\d]+)/g).map((x) => parseInt(x));
    return { x, y, dx, dy };
  });

const minmax = (stars) =>
  stars.reduce((acc, curr) => {
    if (!acc.length) return [curr.x, curr.x, curr.y, curr.y];

    return [
      Math.min(curr.x, acc[0]),
      Math.max(curr.x, acc[1]),
      Math.min(curr.y, acc[2]),
      Math.max(curr.y, acc[3]),
    ];
  }, []);

const boxSize = (stars) => {
  let [minx, maxx, miny, maxy] = minmax(stars);

  return maxx - minx * maxy - miny;
};

const tick = (stars, dir = 1) => {
  for (var x = 0; x < stars.length; x++) {
    stars[x].x += stars[x].dx * dir;
    stars[x].y += stars[x].dy * dir;
  }
};

let size = boxSize(input);
let diff = 1;
let itr = 0;
while (diff > 0) {
  itr++;
  tick(input);
  let newSize = boxSize(input);
  diff = size - newSize;
  size = newSize;
}
tick(input);
itr++;
tick(input);
itr++;

let [x, xx, y, yy] = minmax(input);

console.log(x, xx, y, yy);

let img = [...Array(yy - y + 1)].map((r) => Array(xx - x + 1).fill("."));
console.log(img[0].length, img.length);
for (star of input) img[star.y - y][star.x - x] = "▮";

console.log(img.map((r) => r.join("")));

let result = itr;
console.log({ result });

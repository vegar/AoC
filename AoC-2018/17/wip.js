const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .filter((l) => l.trim() != "")
  .map((line) => {
    let [_, a, n1, b, n2, n3] = line.match(
      /([xy])=(\d+), ([xy])=(\d+)\.\.(\d+)/
    );
    return {
      [a]: [parseInt(n1), parseInt(n1)],
      [b]: [parseInt(n2), parseInt(n3)],
    };
  })
  .sort((a, b) => a.y[0] - b.y[0]);

let [minx, maxx, miny, maxy] = input.reduce(
  ([minx, maxx, miny, maxy], curr) => [
    Math.min(minx, curr.x[0]),
    Math.max(maxx, curr.x[1]),
    Math.min(miny, curr.y[0]),
    Math.max(maxy, curr.y[1]),
  ],
  [Infinity, 0, Infinity, 0]
);

const draw = (world, count = Infinity) => {
  let title = Array(3)
    .fill(" ")
    .map((_, y) =>
      Array(world[0].length)
        .fill(" ")
        .map((_, x) => {
          return (x + minx - 2).toString()[y];
        })
    );
  title.forEach((line) => console.log(`      ${line.join("")}`));

  console.log("");
  console.log(`      ${title[0].map((_, idx) => idx % 10).join("")}`);

  world
    .slice(0, count)
    .forEach((line, y) =>
      console.log(
        `${y.toString().padStart(5, " ")} ${line
          .map((c, x) => (water.find((w) => w.y == y && w.x == x) ? "~" : c))
          .join("")}`
      )
    );
};

let world = Array(maxy + 2)
  .fill(maxx - minx + 3)
  .map((width) => Array(width).fill("."));

input.forEach((wall) => {
  for (let x = wall.x[0]; x <= wall.x[1]; x++)
    for (let y = wall.y[0]; y <= wall.y[1]; y++) world[y][x - minx + 1] = "█";
});

world.push(Array(maxx - minx + 3).fill("█"));

const animateWater = ({ x, y }) => {
  console.log(`Animating x:${x}, y:${y}`);
  if (world[y][x] == "~") return [];

  let edge = [];
  //Find bottom
  let bottom = y;
  while (bottom < maxy && world[bottom + 1][x] == ".") bottom++;

  // If we hit bottom, we're done.
  if (bottom == maxy) {
    for (let yy = y; yy <= bottom; yy++) world[yy][x] = "|";
    return [];
  }

  // if we found water, drop out
  if (world[bottom + 1][x] == "|") {
    for (let yy = y; yy <= bottom; yy++) {
      world[yy][x] = "|";
    }
    return;
  }

  // If not, we're hit a cup, and needs to fill it up.
  let top = bottom;
  while (true) {
    // Find left boundry - or edge
    let lx = x - 1;
    while (
      (world[top][lx] == "." || world[top][lx] == "|") &&
      world[top + 1][lx] != "."
    )
      lx--;
    if (world[top + 1][lx] == ".") edge.push({ x: lx, y: top });

    // Find right boundry - or edge
    let rx = x + 1;
    while (
      (world[top][rx] == "." || world[top][rx] == "|") &&
      world[top + 1][rx] != "."
    )
      rx++;
    if (world[top + 1][rx] == ".") edge.push({ x: rx, y: top });

    // fill layer with drops
    for (let xx = lx + 1; xx < rx; xx++)
      world[top][xx] = edge.length > 0 ? "|" : "~";

    if (edge.length > 0) break;
    top--;
  }

  // fill stream
  for (let yy = y; yy < top; yy++) {
    world[yy][x] = "|";
  }

  return edge;
};

let count = 0;
const water = [];
let spill = ({ x, y }) => {
  count++;
  ///if (count > 143) throw {};

  try {
    let next = animateWater({ x, y });

    //  draw(world);
    //  console.log(`Next: `, next);
    return next.reduce((acc, curr) => acc + spill(curr), 0);
  } catch (e) {
    console.error({ e });
    process.exit;
    //draw(world);
  }
};

console.clear();

let result = spill({ x: 500 - minx + 1, y: miny });
// let result = spill({ x: 0, y: 1896 });
draw(world, maxy + 2);

//let result = spill({ x: 3, y: 10 });
result = 0;

for (let line of world) for (let c of line) result += c == `~` ? 1 : 0;

console.log({ result });
// 29042 to low

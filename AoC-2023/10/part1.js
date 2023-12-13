const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((line) => line.split(""));

let start = undefined;
for (y = 0; y < map.length; y++)
  for (x = 0; x < map[0].length; x++) {
    if (map[y][x] == "S") {
      start = { y, x };
      break;
    }
  }

const key = (pos) => `${pos.x}:${pos.y}`;

const adjecent = {
  "|": ({ x, y }) => [
    { y: y - 1, x },
    { y: y + 1, x },
  ],
  "-": ({ x, y }) => [
    { y, x: x - 1 },
    { y, x: x + 1 },
  ],
  7: ({ x, y }) => [
    { y, x: x - 1 },
    { y: y + 1, x },
  ],
  J: ({ x, y }) => [
    { y, x: x - 1 },
    { y: y - 1, x },
  ],
  F: ({ x, y }) => [
    { y, x: x + 1 },
    { y: y + 1, x },
  ],
  L: ({ x, y }) => [
    { y, x: x + 1 },
    { y: y - 1, x },
  ],
};

const findNext = (current, visitied) => {
  const pipe = map[current.y][current.x];
  console.log(`${current.x}:${current.y} - ${pipe}`);
  if (pipe == "S") {
    if (["L", "-", "F"].includes(map[current.y][current.x - 1])) {
      return { y: current.y, x: current.x - 1 };
    } else if (["J", "-", "7"].includes(map[current.y][current.x + 1])) {
      return { y: current.y, x: current.x + 1 };
    } else if (["F", "|", "7"].includes(map[current.y - 1][current.x])) {
      return { y: current.y - 1, x: current.x };
    } else if (["J", "|", "L"].includes(map[current.y + 1][current.x])) {
      return { y: current.y + 1, x: current.x };
    }
  } else {
    return adjecent[pipe](current).find((p) => !visited.has(key(p)));
  }
};

const visited = new Set();
let current = start;
while (!visited.has(key(current))) {
  visited.add(key(current));

  current = findNext(current, visited);
  if (!current) break;
}

let result = visited.size / 2;
console.log({ result });

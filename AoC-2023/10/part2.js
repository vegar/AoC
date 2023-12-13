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

const mapChars = {
  7: "┐",
  L: "└",
  F: "┌",
  J: "┘",
  "|": "│",
  "-": "─",
  S: "S",
};

const connections = {
  7: ["-", "F", "L"],
  J: ["-", "F", "L"],
  F: [],
  L: [],
  "-": ["L", "F", "-"],
  "|": [],
  S: ["F"],
};

const connected = (pipe, lastPipe) => {
  if (!connections[pipe]) console.log(`Strange pipe!! ${pipe}`);
  return connections[pipe].includes(lastPipe);
};

const rights = ["F", "L", "-"];
const lefts = ["J", "7", "-"];
let inside = undefined;
let count = 0;
for (let y = 0; y < map.length; y++) {
  let line = "";
  let up = 0;
  let down = 0;
  for (let x = 0; x < map[0].length; x++) {
    let pos = key({ x, y });
    let pipe = visited.has(pos) ? map[y][x] : undefined;

    if (pipe == "|" || pipe == "L" || pipe == "J") up++;
    if (pipe == "|" || pipe == "7" || pipe == "F") down++;

    if ((up % 2) + (down % 2) == 2) inside = true;
    else inside = false;

    if (inside && !visited.has(pos)) count++;

    line += visited.has(pos) ? mapChars[map[y][x]] : inside ? "." : " ";
  }
  console.log(line);
  inside = undefined;
}
let result = count;

console.log({ result });

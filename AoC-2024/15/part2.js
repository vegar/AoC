const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(`\n\n`);

const map = input[0].split("\n").map((l) => {
  l = l.replaceAll("#", "##");
  l = l.replaceAll("O", "[]");
  l = l.replaceAll(".", "..");
  l = l.replaceAll("@", "@.");
  return l.split("");
});
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
  const nextTile = map[y + dy][x + dx];

  if (nextTile == "#") return false;
  if (nextTile == ".") return true;

  if (nextTile == "[" || nextTile == "]") {
    if (dy == 0) return canMove(x + dx, y, dir);
    else
      return (
        canMove(x, y + dy, dir) &&
        canMove(x + (nextTile == "]" ? -1 : +1), y + dy, dir)
      );
  }
};

const move = (x, y, dir) => {
  const [dx, dy] = moveMap[dir];
  if (canMove(x, y, dir)) {
    const nextTile = map[y + dy][x + dx];
    if (nextTile == "]" || nextTile == "[") {
      if (dy == 0) move(x + dx, y, dir);
      if (dx == 0) {
        move(x, y + dy, dir);
        move(x + (nextTile == "]" ? -1 : +1), y + dy, dir);
      }
    }
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
    if (map[y][x] == "[") result = result + y * 100 + x;
  }

console.log({ result });

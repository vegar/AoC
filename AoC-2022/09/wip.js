const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const visited = new Set();

const position = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

const distance = (head, tail) => {
  const dx = head[0] - tail[0];
  const dy = head[1] - tail[1];
  return [dx, dy];
};

const coord = (pos) =>
  `${("" + pos[0]).padStart(3, " ")}:${("" + pos[1]).padStart(3, " ")}`;

const followHead = (head, tail) => {
  const dist = distance(head, tail);

  let delta = [0, 0];

  if (dist[0] == [2] && dist[1] == [2]) delta = [1, 1];
  if (dist[0] == [-2] && dist[1] == [-2]) delta = [-1, -1];
  if (dist[0] == [2] && dist[1] == [-2]) delta = [1, -1];
  if (dist[0] == [-2] && dist[1] == [2]) delta = [-1, 1];

  if (dist[0] == [2] && dist[1] == [0]) delta = [1, 0];
  if (dist[0] == [-2] && dist[1] == [0]) delta = [-1, 0];
  if (dist[0] == [0] && dist[1] == [-2]) delta = [0, -1];
  if (dist[0] == [0] && dist[1] == [2]) delta = [0, 1];

  if (dist[0] == [2] && dist[1] == [1]) delta = [1, 1];
  if (dist[0] == [2] && dist[1] == [-1]) delta = [1, -1];
  if (dist[0] == [-2] && dist[1] == [1]) delta = [-1, 1];
  if (dist[0] == [-2] && dist[1] == [-1]) delta = [-1, -1];

  if (dist[0] == [1] && dist[1] == [2]) delta = [1, 1];
  if (dist[0] == [-1] && dist[1] == [2]) delta = [-1, 1];
  if (dist[0] == [1] && dist[1] == [-2]) delta = [1, -1];
  if (dist[0] == [-1] && dist[1] == [-2]) delta = [-1, -1];

  return [tail[0] + delta[0], tail[1] + delta[1]];
};

const move = {
  R: (head) => [head[0] + 1, head[1]],
  L: (head) => [head[0] - 1, head[1]],
  U: (head) => [head[0], head[1] - 1],
  D: (head) => [head[0], head[1] + 1],
};

let logCount = 0;
const log = (positions) => {
  logCount++;
  console.log(
    `${logCount.toString().padStart(5, " ")} - ${positions
      .map((curr, idx) => `${idx == 0 ? "H" : idx} [${coord(curr)}]`)
      .join(" ")}`
  );
};

const draw = (positions) => {
  const bounds = {
    miny: -15,
    maxy: 5,
    minx: -11,
    maxx: 14,
  };

  const size = {
    width: bounds.maxx - bounds.minx + 1,
    height: bounds.maxy - bounds.miny + 1,
  };

  const board = new Array(size.height);
  for (let r = 0; r < board.length; r++) {
    board[r] = new Array(size.width);
    board[r].fill(".");
  }

  positions.forEach((pos, idx) => {
    const row = pos[1] - bounds.miny;
    const col = pos[0] - bounds.minx;

    if (board[row][col] == ".") board[row][col] = idx ? idx : "H";
  });

  console.log("");
  board.forEach((l) => console.log(l.join("")));
};

input.reduce((position, curr) => {
  const [dir, length] = curr.split(" ");
  const newPos = [...position];
  for (let i = 0; i < length; i++) {
    newPos[0] = move[dir](newPos[0]);
    for (let j = 1; j < newPos.length; j++) {
      newPos[j] = followHead(newPos[j - 1], newPos[j]);
    }
    visited.add(coord(newPos[newPos.length - 1]));
  }
  return newPos;
}, position);

let result = visited.size;
console.log({ result });

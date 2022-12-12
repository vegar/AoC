const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const visited = new Set();

const position = {
  head: [0, 0],
  tail: [0, 0],
};

const distance = (head, tail) => {
  const dx = head[0] - tail[0];
  const dy = head[1] - tail[1];
  return [dx, dy];
};

const coord = (pos) => `${pos[0]}:${pos[1]}`;

const followHead = (head, tail) => {
  const dist = distance(head, tail);

  const delta = [0, 0];
  if (dist[0] == 2) {
    delta[0] = 1;
    delta[1] = dist[1];
  }
  if (dist[0] == -2) {
    delta[0] = -1;
    delta[1] = dist[1];
  }
  if (dist[1] == 2) {
    delta[1] = 1;
    delta[0] = dist[0];
  }
  if (dist[1] == -2) {
    delta[1] = -1;
    delta[0] = dist[0];
  }

  return [tail[0] + delta[0], tail[1] + delta[1]];
};

const move = {
  R: (position) => ({
    head: [position.head[0] + 1, position.head[1]],
    tail: followHead([position.head[0] + 1, position.head[1]], position.tail),
  }),
  L: (position) => ({
    head: [position.head[0] - 1, position.head[1]],
    tail: followHead([position.head[0] - 1, position.head[1]], position.tail),
  }),
  U: (position) => ({
    head: [position.head[0], position.head[1] - 1],
    tail: followHead([position.head[0], position.head[1] - 1], position.tail),
  }),
  D: (position) => ({
    head: [position.head[0], position.head[1] + 1],
    tail: followHead([position.head[0], position.head[1] + 1], position.tail),
  }),
};

const endPos = input.reduce((position, curr) => {
  const [dir, length] = curr.split(" ");
  let newPos = position;
  for (let i = 0; i < length; i++) {
    newPos = move[dir](newPos);
    visited.add(coord(newPos.tail));
  }
  return newPos;
}, position);

let result = visited.size;
console.log({ result });

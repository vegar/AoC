const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const [players, marbles] = input.match(/(\d+)/g);

const log = (player, startNode, currentNode) => {
  return;

  let str = `[${player}] `;
  let n = startNode;
  do {
    str += ` ${n == currentNode ? "(" : " "}${n.value}${
      n == currentNode ? ")" : ""
    }`;
    n = n.next;
  } while (n != startNode);
  console.log(str);
};

const insert = (current, round) => {
  let newNode = { value: round, prev: current.next, next: current.next.next };
  newNode.prev.next = newNode;
  newNode.next.prev = newNode;

  return newNode;
};

const walk = (current, num) => {
  let n = current;
  while (num-- > 0) n = n.prev;
  return n;
};

const add = (points, player, win) => {
  points.set(player, (points.get(player) ?? 0) + win);
};

const play = (players, marbles) => {
  let points = new Map();
  let round = 1;
  let current = { value: 0 };
  current.next = current;
  current.prev = current;
  let start = current;

  while (round <= marbles) {
    if (round % 23) current = insert(current, round);
    else {
      let win = walk(current, 7);
      current = win.next;
      win.prev.next = win.next;
      win.next.pev = current;

      add(points, round % players, win.value + round);
    }
    log(round % players, start, current);
    round++;
  }
  return Math.max(...points.values());
};

let result = play(players, marbles);
console.log({ result });

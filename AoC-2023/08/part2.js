const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const [instructions, _, ...map] = input.split("\n");

const connections = map.reduce((acc, curr) => {
  const [from, left, right] = [...curr.matchAll(/([A-Z\d]{3})/g)].map(
    (m) => m[1]
  );
  acc.set(from, { L: left, R: right });

  return acc;
}, new Map());

const isStop = (start) => {
  return start.every((k) => {
    return k.at(-1) == "Z";
  });
};

let start = [...connections.keys()].filter((k) => k.at(-1) == "A");
let originalStart = [...start];

let loopLength = originalStart.map((start) => {
  let step = 0;
  let pos = start;
  while (pos.at(-1) != "Z") {
    const dir = instructions.at(step % instructions.length);
    pos = connections.get(pos)[dir];
    step++;
  }
  return step;
});

const gcd = ([a, b]) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

const lcd = (a, b) => (a / gcd([a, b])) * b;

console.log(loopLength);

let result = loopLength.reduce((acc, curr) => lcd(acc, curr)); //step;
console.log({ result });

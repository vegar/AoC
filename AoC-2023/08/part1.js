const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const [instructions, _, ...map] = input.split("\n");

const connections = map.reduce((acc, curr) => {
  const [from, left, right] = [...curr.matchAll(/([A-Z]{3})/g)].map(
    (m) => m[1]
  );
  acc.set(from, { L: left, R: right });

  return acc;
}, new Map());

let start = "AAA";
let step = 0;
while (start != "ZZZ") {
  const dir = instructions.at(step % instructions.length);
  start = connections.get(start)[dir];
  step++;
}

let result = step;
console.log({ result });

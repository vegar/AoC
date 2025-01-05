const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => l.split("-"));

const map = new Map();
const computers = new Set();
input.forEach(([c1, c2]) => {
  if (!map.has(c1)) map.set(c1, new Set());
  if (!map.has(c2)) map.set(c2, new Set());

  map.get(c1).add(c2);
  map.get(c2).add(c1);

  computers.add(c1);
  computers.add(c2);
});

const groups = [...computers.keys()].reduce((acc, comp) => {
  const n = map.get(comp);
  n.forEach((nn) => {
    const nc = map.get(nn);
    nc.forEach((nnn) => {
      nnc = map.get(nnn);
      if (nnc.has(comp))
        acc.add([comp, nn, nnn].sort((a, b) => a.localeCompare(b)).join(","));
    });
  });
  return acc;
}, new Set());

console.log(groups);

let result = [...groups].reduce((count, curr) => {
  if (curr.match(/^t|,t/)) count++;
  return count;
}, 0);
console.log({ result });

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .flatMap((line) => {
    let [from, _, to, __, distance] = line.split(" ");

    return [
      {
        to,
        from,
        distance: parseInt(distance),
      },
      { to: from, from: to, distance: parseInt(distance) },
    ];
  });

let graph = input.reduce((acc, curr) => {
  if (!acc.has(curr.from)) {
    acc.set(curr.from, new Map());
  }

  acc.get(curr.from).set(curr.to, curr.distance);

  return acc;
}, new Map());

let minCost = Infinity;
let maxCost = 0;

const search = (town, cost, visited) => {
  if (visited.size == graph.size) {
    if (cost < minCost) minCost = cost;
    if (cost > maxCost) maxCost = cost;
    return;
  }

  let node = graph.get(town);
  for (let t of node.keys()) {
    if (visited.has(t)) continue;
    search(t, cost + node.get(t), new Set([...visited.keys(), t]));
  }
};

console.log({ size: graph.size });
for (let town of graph.keys()) {
  search(town, 0, new Set([town]));
}

let result = maxCost;
console.log({ result });

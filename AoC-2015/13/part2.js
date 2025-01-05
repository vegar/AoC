const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => {
    let [_, a, sign, val, b] = l.match(/(\w+).*(gain|lose) (\d+) .+ (\w+)/);
    return {
      a,
      val: sign == "gain" ? parseInt(val) : parseInt(val) * -1,
      b,
    };
  });

const graph = input.reduce((map, curr) => {
  if (!map.has(curr.a)) map.set(curr.a, new Map([["Me", 0]]));

  map.get(curr.a).set(curr.b, curr.val);

  return map;
}, new Map());

let maxHappiness = 0;

const search = (person, cost, visited) => {
  let node = graph.get(person);

  if (visited.length == graph.size) {
    //add cost of this person to first person
    let x = node.get(visited[0]) + graph.get(visited[0]).get(person);

    if (cost + x > maxHappiness) maxHappiness = cost + x;
    return;
  }

  for (let t of node.keys()) {
    if (visited.find((x) => x == t)) continue;
    let x = node.get(t) + graph.get(t).get(person);
    search(t, cost + x, [...visited, t]);
  }
};

graph.set("Me", new Map());
for (let person of graph.keys()) {
  if (person == "Me") continue;
  graph.get("Me").set(person, 0);
}

console.log(graph);

for (let person of graph.keys()) {
  search(person, 0, [person]);
}

let result = maxHappiness;
console.log({ result });

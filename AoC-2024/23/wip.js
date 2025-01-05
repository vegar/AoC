const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => l.split("-"));

const map = new Map();
const computers = new Set();
input.forEach(([c1, c2]) => {
  if (!map.has(c1)) map.set(c1, []);
  if (!map.has(c2)) map.set(c2, []);

  map.get(c1).push(c2);
  map.get(c2).push(c1);

  computers.add(c1);
  computers.add(c2);
});

function bronKerbosch(R, P, X, graph, cliques) {
  if (P.length === 0 && X.length === 0) {
    cliques.push(R);
    return;
  }
  const Pcopy = P.slice();
  for (let i = 0; i < Pcopy.length; i++) {
    const v = Pcopy[i];
    bronKerbosch(
      R.concat(v),
      P.filter((n) => graph.get(v).includes(n)),
      X.filter((n) => graph.get(v).includes(n)),
      graph,
      cliques
    );

    P = P.filter((n) => n !== v);
    X = X.concat(v);
  }
}

function findCliques(graph) {
  const cliques = [];
  const vertices = [...graph.keys()];
  bronKerbosch([], vertices, [], graph, cliques);
  return cliques;
}

const clique = findCliques(map)
  .sort((a, b) => a.length - b.length)
  .at(-1);

let result = clique.sort((a, b) => a.localeCompare(b)).join(",");

console.log({ result });

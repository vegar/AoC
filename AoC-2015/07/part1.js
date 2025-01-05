const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

const wires = new Map();

let gates = input.map((line) => {
  const { a, op, b, out } = line.match(
    /(?<a>[a-z\d]+)? ?(?<op>[A-Z]+)? ?(?<b>[a-z\d]+)? -> (?<out>\w+)/
  ).groups;

  return { a, op: op ?? "", b, out, line };
});

const gateByOut = gates.reduce((acc, gate) => {
  acc.set(gate.out, gate);

  return acc;
}, new Map());

const getIn = (val) => {
  let x = parseInt(val);
  if (Number.isNaN(x)) return execute(val);
  return x;
};

const operators = {
  "": (g) => {
    return getIn(g.a);
  },
  AND: (g) => {
    let a = getIn(g.a);
    let b = getIn(g.b);
    return a & b;
  },
  OR: (g) => {
    let a = getIn(g.a);
    let b = getIn(g.b);
    return a | b;
  },
  NOT: (g) => {
    let b = getIn(g.b);
    return ~b & 0xffff;
  },
  LSHIFT: (g) => {
    let a = getIn(g.a);
    let b = getIn(g.b);
    return a << b;
  },
  RSHIFT: (g) => {
    let a = getIn(g.a);
    let b = getIn(g.b);
    return a >> b;
  },
};

const cache = new Map();

const execute = (wire) => {
  if (cache.has(wire)) return cache.get(wire);

  let g = gateByOut.get(wire);
  if (!g) {
    console.log(`Could not find gate for ${wire}`);
  }
  let r = operators[g.op](g);
  if (Number.isNaN(r)) console.log(`${g.line} returned NaN!!`);
  cache.set(wire, r);
  return r;
};

let result = execute("a");
console.log({ result });

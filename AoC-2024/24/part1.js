const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n\n");

const wires = new Map();

const getOrSet = (wire) => {
  if (!wires.has(wire))
    wires.set(wire, {
      in: undefined,
      outs: [],
      value: undefined,
    });
  return wires.get(wire);
};

const gates = input[1].split("\n").map((l, idx) => {
  const [in1, op, in2, _, out] = l.split(" ");
  getOrSet(in1).outs.push(idx);
  getOrSet(in2).outs.push(idx);

  getOrSet(out).in = idx;
  return {
    in1,
    in2,
    out,
    op,
    id: idx,
  };
});

const op = {
  AND: (v1, v2) => (v1 == "1" && v2 == "1" ? "1" : "0"),
  OR: (v1, v2) => (v1 == "1" || v2 == "1" ? "1" : "0"),
  XOR: (v1, v2) => (v1 != v2 ? "1" : "0"),
};

const triggerGate = (gate) => {
  let in1 = wires.get(gate.in1);
  let in2 = wires.get(gate.in2);
  if (in1.value != undefined && in2.value != undefined) {
    let o = op[gate.op](in1.value, in2.value);
    setValue(gate.out, o);
  }
};

const setValue = (wire, value) => {
  let w = getOrSet(wire);
  w.value = value;

  for (let g of w.outs) {
    let gate = gates[g];
    triggerGate(gate);
  }
};

input[0].split("\n").forEach((line) => {
  let [wire, value] = line.split(": ");
  getOrSet(wire).value = value;
  setValue(wire, value);
});

console.log(gates);
console.log(wires);

const z = [...wires.keys()]
  .filter((k) => k[0] == "z")
  .sort((a, b) => {
    return b.localeCompare(a);
  })
  .map((w) => wires.get(w).value);

console.log(z.join(""));

let result = parseInt(z.join(""), 2);
console.log({ result });

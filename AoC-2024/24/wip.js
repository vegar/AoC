const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n\n");

const gates = input[1].split("\n").map((l, idx) => {
  const [in1, op, in2, _, out] = l.split(" ");

  return {
    in1,
    in2,
    out,
    op,
    id: idx,
  };
});

const findGate = (in1, in2) => {
  if (in1 == "out") return gates.filter((g) => g.out == in2);

  if (in1 == "AND" || in1 == "OR" || in1 == "XOR") {
    return gates
      .filter((g) => g.op == in1)
      .filter((g) => g.in1 == in2 || g.in2 == in2);
  }
  return gates.filter(
    (g) => (g.in1 == in1 && g.in2 == in2) || (g.in1 == in2 && g.in2 == in1)
  );
};

const errors = new Set();

// Find input gates with wong ouputs

// for gates with x00 and y00 inputs,
//   if the gate is an AND gate, it's output has to go to an OR gate
//   if the gate is an XOR gate, it's output has to go to an XOR gate
// for gates with z00 output, the operation has to be XOR

for (x = 2; x < 40; x++) {
  let in1 = `x${x.toString().padStart(2, "0")}`;
  let in2 = `y${x.toString().padStart(2, "0")}`;
  for (let g of findGate(in1, in2)) {
    if (g.op == "AND") {
      let x = findGate("OR", g.out);
      if (x.length == 0) errors.add(g.out);
    }
    if (g.op == "XOR") {
      let x = findGate("XOR", g.out);
      if (x.length == 0) errors.add(g.out);
    }
  }

  let z = findGate("out", `z${x.toString().padStart(2, "0")}`);
  if (z[0].op != "XOR") errors.add(z[0].out);
}

// if the output of an gate is not z, and the input is not x and y,
// the operation has to be AND or OR, not XOR
for (let g of gates
  .filter((g) => !g.out.startsWith("z"))
  .filter((g) => !g.in1.startsWith("x") && !g.in1.startsWith("y"))
  .filter((g) => g.op == "XOR")) {
  errors.add(g.out);
}

let result = [...errors.keys()].sort((a, b) => a.localeCompare(b)).join(",");
console.log({ result });

// Correct answer: cnk,mps,msq,qwf,vhm,z14,z27,z39.

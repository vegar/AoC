const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

const machine = input.reduce(
  (m, l) => {
    if (l.startsWith("Register")) {
      let x = l.match(/([A-C]): (\d+)/);
      m[x[1]] = parseInt(x[2]);
    }

    if (l.startsWith("Program")) {
      let [_, p] = l.split(" ");
      m.program = p.split(",").map((i) => parseInt(i));
    }

    return m;
  },
  { ip: 0, out: [] }
);

const combo = (machine) => {
  let c = machine.program[machine.ip + 1];
  return c < 4
    ? c
    : c == 4
    ? machine.A
    : c == 5
    ? machine.B
    : c == 6
    ? machine.C
    : undefined;
};

const opcodes = {
  [0]: (machine) =>
    (machine.A = Math.trunc(machine.A / Math.pow(2, combo(machine)))),
  [1]: (machine) => (machine.B = machine.B ^ combo(machine)),
  [2]: (machine) => (machine.B = combo(machine) % 8),
  [3]: (machine) => {
    if (machine.A != 0) machine.ip = combo(machine) - 2;
  },
  [4]: (machine) => (machine.B = machine.B ^ machine.C),
  [5]: (machine) => {
    let r = combo(machine) % 8;
    r.toString()
      .split("")
      .forEach((x) => machine.out.push(x));
  },
  [6]: (machine) => (machine.B = Math.trunc(machine.A / 2 ** combo(machine))),
  [7]: (machine) => (machine.C = Math.trunc(machine.A / 2 ** combo(machine))),
};

const run = (machine) => {
  while (machine.ip < machine.program.length - 1) {
    const op = machine.program[machine.ip];
    const co = combo(machine);
    console.log(`${machine.ip}: ${op}(${co})`);
    opcodes[machine.program[machine.ip]](machine);

    machine.ip += 2;
  }
  console.log(machine);
};

//run({ A: 0, B: 0, C: 9, ip: 0, program: [2, 6] });
//run({ A: 10, B: 0, C: 0, ip: 0, program: [5, 0, 5, 1, 5, 4], out: [] });
//run({ A: 2024, B: 0, C: 0, ip: 0, program: [0, 1, 5, 4, 3, 0], out: [] });

run(machine);

let result = machine.out.join(",");
console.log({ result });

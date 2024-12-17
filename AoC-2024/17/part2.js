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

const literal = (machine) => machine.program[machine.ip + 1];

const opcodes = {
  [0]: (machine) =>
    (machine.A = Math.trunc(machine.A / Math.pow(2, combo(machine)))),
  [1]: (machine) => (machine.B = (machine.B ^ combo(machine)) >>> 0),
  [2]: (machine) => (machine.B = combo(machine) % 8),
  [3]: (machine) => {
    if (machine.A != 0) machine.ip = combo(machine) - 2;
  },
  [4]: (machine) => (machine.B = (machine.B ^ machine.C) >>> 0),
  [5]: (machine) => machine.out.push(combo(machine) % 8),
  [6]: (machine) => (machine.B = Math.trunc(machine.A / 2 ** combo(machine))),
  [7]: (machine) => (machine.C = Math.trunc(machine.A / 2 ** combo(machine))),
};

const opcodesStr = {
  [0]: (machine) =>
    `adv ${machine.A} / 2^${combo(machine)} => ${Math.trunc(
      machine.A / Math.pow(2, combo(machine))
    )}`,
  [1]: (machine) =>
    `bxl ${machine.B} ^ ${literal(machine)} => ${machine.B ^ literal(machine)}`,
  [2]: (machine) => `bst ${combo(machine)} % 8 => ${combo(machine) % 8}`,
  [3]: (machine) => `jnz ${machine.A != 0 ? literal(machine) : 0}`,
  [4]: (machine) =>
    `bxc ${machine.B} ^ ${machine.C} => ${machine.B ^ machine.C}`,
  [5]: (machine) => `out ${combo(machine)} % 8 => ${combo(machine) % 8}`,
  [6]: (machine) =>
    `bdv ${machine.A} / 2^${combo(machine)} => ${Math.trunc(
      machine.A / Math.pow(2, combo(machine))
    )}`,
  [7]: (machine) =>
    `cdv ${machine.A} / 2^${combo(machine)} => ${Math.trunc(
      machine.A / Math.pow(2, combo(machine))
    )}`,
};

const toStr = (machine) => {
  console.log(
    `ip: ${machine.ip} => ${opcodesStr[machine.program[machine.ip]](machine)}`
  );
};

const run = (m) => {
  while (m.ip < m.program.length - 1) {
    const op = m.program[m.ip];
    //toStr(m);
    opcodes[op](m);

    m.ip += 2;
  }
};

const makeMachine = (a) => {
  return { ...machine, out: [], A: a };
};

let p = machine.program.length - 1;
let currRegA = [0];
while (p >= 0) {
  const nextRegA = [];
  const expectedOutput = machine.program.slice(p).join(",");
  for (const r of currRegA) {
    const newA = r * 8;
    for (let y = 0; y < 8; y++) {
      const cra = newA + y;
      const newMachine = makeMachine(cra);
      run(newMachine);

      if (newMachine.out.join(",") == expectedOutput) {
        nextRegA.push(cra);
      }
    }
  }
  p -= 1;
  currRegA = [...nextRegA];
}

let result = Math.min(...currRegA);
console.log({ result });

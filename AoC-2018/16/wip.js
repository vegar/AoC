const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let [samples, program] = input.split("\n\n\n\n");
samples = samples.split("\n\n").map((sample) => {
  let [before, instruction, after] = sample
    .split("\n")
    .map((l) => Array.from(l.matchAll(/\d+/g), (m) => parseInt(m[0])));
  let [opcode, a, b, c] = instruction;
  return { before, instruction: { opcode, a, b, c }, after };
});
program = program.split("\n").map((line) => {
  let [opcode, a, b, c] = line.split(" ").map(Number);
  return { opcode, a, b, c };
});

const opcodes = {
  // Addition
  addr: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] + reg[b];
    return newReg;
  },
  addi: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] + b;
    return newReg;
  },
  // Multiplication
  mulr: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] * reg[b];
    return newReg;
  },
  muli: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] * b;
    return newReg;
  },
  // Bitwise AND
  banr: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] & reg[b];
    return newReg;
  },
  bani: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] & b;
    return newReg;
  },
  // Bitwise OR
  borr: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] | reg[b];
    return newReg;
  },
  bori: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] | b;
    return newReg;
  },
  // Assignment
  setr: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = newReg[a];
    return newReg;
  },
  seti: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = a;
    return newReg;
  },
  // Greater-than testing
  gtir: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = a > reg[b] ? 1 : 0;
    return newReg;
  },
  gtri: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] > b ? 1 : 0;
    return newReg;
  },
  gtrr: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] > reg[b] ? 1 : 0;
    return newReg;
  },
  // Equality testing
  eqir: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = a == reg[b] ? 1 : 0;
    return newReg;
  },
  eqri: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] == b ? 1 : 0;
    return newReg;
  },
  eqrr: (reg, a, b, c) => {
    let newReg = [...reg];
    newReg[c] = reg[a] == reg[b] ? 1 : 0;
    return newReg;
  },
};

const equals = (a, b) => {
  return a.every((v, i) => b[i] == v);
};

let opcodeNumbers = [
  [], // 0
  [], // 1
  [], // 2
  [], // 3
  [], // 4
  [], // 5
  [], // 6
  [], // 7
  [], // 8
  [], // 9
  [], //10
  [], //11
  [], //12
  [], //13
  [], //14
  [], //15]
];

const test = (input, instruction, output) => {
  let match = new Set();
  for (let op in opcodes) {
    let newReg = opcodes[op](
      input,
      instruction.a,
      instruction.b,
      instruction.c
    );

    if (equals(output, newReg)) match.add(op);
  }
  return [...match.keys()].sort((a, b) => a.localeCompare(b)).join("-");
};

for (let sample of samples) {
  let match = test(sample.before, sample.instruction, sample.after);
  opcodeNumbers[sample.instruction.opcode].push(match);
}

for (let i = 0; i < opcodeNumbers.length; i++) {
  opcodeNumbers[i] = findCommonValue(
    [...new Set(opcodeNumbers[i]).keys()].map((k) => k.split("-"))
  );
}
console.log(opcodeNumbers);

function findCommonValue(lists) {
  if (lists.length === 0) return null;

  // Start with the first list
  let [firstList, ...restLists] = lists;

  // Filter values that are present in all other lists
  return firstList.filter((value) =>
    restLists.every((list) => list.includes(value))
  );
}

while (true) {
  console.log(opcodeNumbers);
  let next = opcodeNumbers.findIndex((x) => Array.isArray(x) && x.length == 1);

  if (next < 0) break;

  let opCode = opcodeNumbers[next][0];
  opcodeNumbers[next] = opCode;

  for (let x = 0; x < opcodeNumbers.length; x++) {
    if (x != next && Array.isArray(opcodeNumbers[x])) {
      let oidx = opcodeNumbers[x].findIndex((o) => o == opCode);
      if (oidx > -1) {
        opcodeNumbers[x].splice(oidx, 1);
      }
    }
  }
}
// }

let reg = [0, 0, 0, 0];
for (let line of program) {
  let operator = opcodeNumbers[line.opcode];
  reg = opcodes[opcodeNumbers[line.opcode]](reg, line.a, line.b, line.c);
  console.log(
    `${operator} ${line.a} ${line.b} ${line.c} => [${reg[0]}, ${reg[1]}, ${reg[2]}, ${reg[3]}]`
  );
}

let result = reg[0];
console.log({ result });

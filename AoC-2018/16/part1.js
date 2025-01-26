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

const test = (input, opcode, output) => {
  let match = [];
  for (let op in opcodes) {
    let newReg = opcodes[op](input, opcode.a, opcode.b, opcode.c);
    if (equals(output, newReg)) match.push(op);
  }
  return match;
};

let result = 0;
for (let sample of samples) {
  let match = test(sample.before, sample.instruction, sample.after);
  if (match.length >= 3) result++;
}

console.log({ result });

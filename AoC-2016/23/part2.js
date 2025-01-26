const input = require("fs")
  .readFileSync(require("path").join(__dirname, `input.txt`), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let [cmd, ...params] = line.split(" ");
    return [cmd, params];
  });

const instructions = {
  cpy: ([x, y], registers) => {
    let val = parseInt(x);
    if (Number.isNaN(val)) val = registers[x];
    registers[y] = val;
    return 1;
  },
  inc: ([a], registers) => {
    registers[a] += 1;
    return 1;
  },
  dec: ([a], registers) => {
    registers[a] -= 1;
    return 1;
  },
  jnz: ([x, y], registers) => {
    let val = parseInt(x);
    if (Number.isNaN(val)) val = registers[x];

    let valy = parseInt(y);
    if (Number.isNaN(valy)) valy = registers[y];

    return val != 0 ? valy : 1;
  },
  tgl: ([x, y], registers, idx, program) => {
    let val = parseInt(x);
    if (Number.isNaN(val)) val = registers[x];

    let dx = idx + val;

    if (dx >= program.length || dx < 0) return 1;

    let [cmd, params] = program[dx];
    if (params.length == 1) {
      if (cmd == "inc") program[dx][0] = "dec";
      else program[dx][0] = "inc";
    } else {
      if (cmd == "jnz") program[dx][0] = "cpy";
      else program[dx][0] = "jnz";
    }

    return 1;
  },
};
let idx = 0;
let registers = { a: 12, b: 0, c: 0, d: 0 };
while (idx < input.length) {
  let [cmd, params] = input[idx];
  idx += instructions[cmd](params, registers, idx, input);
}

let result = registers.a;
console.log({ result });

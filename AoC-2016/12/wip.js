const input = require("fs")
  .readFileSync(require("path").join(__dirname, "..\\23\\input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let [cmd, ...params] = line.split(" ");
    return [cmd, params];
  });

const instructions = {
  cpy: ([x, y], registers) => {
    let val = parseInt(x) || registers[x];
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
    let val = parseInt(x) || registers[x];
    return val != 0 ? parseInt(y) : 1;
  },
};
let idx = 0;
let registers = { a: 7, b: 0, c: 0, d: 0 };
while (idx < input.length) {
  let [cmd, params] = input[idx];
  console.log(cmd, params, JSON.stringify(registers));
  idx += instructions[cmd](params, registers);
}

let result = registers.a;
console.log({ result });

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const cpu = {
  register: 1,
  cycle: 0,
};

const operations = {
  noop: (_, cp) => {
    cpu.cycle += 1;
    cp();
  },
  addx: (v, cb) => {
    cpu.cycle += 1;
    cb();
    cpu.cycle += 1;
    cb();
    cpu.register += parseInt(v);
  },
};

const cycles = new Map([
  [20, 0],
  [60, 0],
  [100, 0],
  [140, 0],
  [180, 0],
  [220, 0],
]);

for (let line of input) {
  const [op, arg] = line.split(" ");
  console.log(
    `${line.padEnd(8)} - cycle: ${cpu.cycle}  register: ${cpu.register}`
  );

  operations[op](arg, () => {
    if (cycles.has(cpu.cycle)) {
      cycles.set(cpu.cycle, cpu.register);
    }
  });
  console.log(
    `${" ".padEnd(8)}   cycle: ${cpu.cycle}  register: ${cpu.register}`
  );
}

let result = 0;
cycles.forEach((c, r) => (result += c * r));
console.log({ result });

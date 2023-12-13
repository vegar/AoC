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

const splite = "###.....................................";
const screen = [];

for (let line of input) {
  const [op, arg] = line.split(" ");
  operations[op](arg, () => {
    const x = cpu.cycle % 40;
    if (cpu.register <= x && x <= cpu.register + 2) {
      screen.push("▮");
    } else {
      screen.push(" ");
    }
  });
}

for (let i = 0; i < screen.length; i += 40) {
  console.log(screen.slice(i, i + 40).join(""));
}

let result = 0;
console.log({ result });

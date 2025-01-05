const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.replace(",", "").split(" "))
  .map(([instruction, ...params]) => ({ instruction, params }));

const instructions = {
  hlf: (params, idx, a, b) =>
    params[0] == "a"
      ? { idx: idx + 1, a: a / 2, b }
      : { idx: idx + 1, a: a, b: b / 2 },
  tpl: (params, idx, a, b) =>
    params[0] == "a"
      ? { idx: idx + 1, a: a * 3, b }
      : { idx: idx + 1, a: a, b: b * 3 },
  inc: (params, idx, a, b) =>
    params[0] == "a"
      ? { idx: idx + 1, a: a + 1, b }
      : { idx: idx + 1, a: a, b: b + 1 },
  jmp: (params, idx, a, b) => ({ idx: idx + Number(params[0]), a, b }),
  jie: (params, idx, a, b) =>
    params[0] == "a"
      ? { idx: idx + (a % 2 == 0 ? Number(params[1]) : 1), a, b }
      : { idx: idx + (b % 2 == 0 ? Number(params[1]) : 1), a, b },
  jio: (params, idx, a, b) =>
    params[0] == "a"
      ? { idx: idx + (a == 1 ? Number(params[1]) : 1), a, b }
      : { idx: idx + (b == 1 ? Number(params[1]) : 1), a, b },
};

let cpu = { idx: 0, a: 1, b: 0 };
while (cpu.idx < input.length) {
  let { instruction, params } = input[cpu.idx];
  console.log(
    `${instruction} ${params.join(",")}   - ${cpu.idx}, a:${cpu.a}, b:${cpu.b}`
  );

  cpu = instructions[instruction](params, cpu.idx, cpu.a, cpu.b);
}

let result = cpu.b;
console.log({ result });

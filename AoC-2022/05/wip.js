const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .split(/\r?\n/);

const stacks = [];

function* chunk(input, size) {
  for (var i = 0; ; i += size) {
    if (i > input.length) return;
    yield [i / size, input.substring(i, i + size)];
  }
}

for (let i = 0; i < input.length; i++) {
  const a = input[i].match(/move (\d*) from (\d*) to (\d*)/);
  if (a) {
    const [_, count, from, to] = a;
    const crates = stacks[from - 1].splice(
      stacks[from - 1].length - count,
      count
    );
    stacks[to - 1].push(...crates);
  } else if (input[i].length > 0) {
    for (let [idx, c] of chunk(input[i], 4)) {
      if (c.trim()) {
        stacks[idx] = stacks[idx] ?? [];
        const m = c.match(/[A-Z]+/);
        if (m) stacks[idx].splice(0, 0, m[0]);
      }
    }
  }
}

let result = stacks.map((s) => s.pop()).join("");
console.log({ result });

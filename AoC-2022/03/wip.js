const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

function* chunk(lines, chunkSize) {
  for (let i = 0; i < lines.length - 1; i += chunkSize)
    yield lines.slice(i, i + chunkSize);
}

const badges = [];
for (const group of chunk(input, 3)) {
  const dup = [
    ...new Set(
      [...group[0].matchAll(`[${group[1]}]`, { global: true })].map((m) => m[0])
    ),
  ].join("");
  const [badge] = group[2].match(`[${dup}]`);

  badges.push(badge);
}

let result = badges
  .map((b) => {
    const val = b.charCodeAt(0) - 96;

    return val < 0 ? val + 58 : val;
  })
  .reduce((acc, curr) => acc + curr);

console.log({ result });

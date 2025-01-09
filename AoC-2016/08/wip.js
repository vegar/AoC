const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => {
    let [_, cmd, a, b] = l.match(/([a-z ]+).*?(\d+).*?(\d+)/);
    return { cmd, a: parseInt(a), b: parseInt(b) };
  });

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const draw = async (cmd, a, b, monitor) => {
//   console.clear();
//   console.log(`${cmd} a:${a} b:${b}`);

//   await delay(100);
// };

const WIDE = 50; //7;
const TALL = 6; //3;
let result = 0;

//(async () => {
let monitor = Array(TALL)
  .fill(" ")
  .map((_) => Array(WIDE).fill(" "));
for (let { cmd, a, b } of input) {
  let next = [...monitor].map((l) => [...l]);

  if (cmd == "rect ") {
    for (let y = 0; y < b; y++) for (let x = 0; x < a; x++) next[y][x] = "#";
  } else if (cmd == "rotate row y") {
    for (let x = 0; x < monitor[a].length; x++) {
      next[a][(x + b) % monitor[a].length] = monitor[a][x];
    }
  } else if (cmd == "rotate column x") {
    for (let y = 0; y < monitor.length; y++) {
      next[(y + b) % monitor.length][a] = monitor[y][a];
    }
  }
  //await draw(cmd, a, b, next);
  monitor = next;
}

result = monitor.reduce((sum, row) => {
  let p = row.reduce((s, x) => s + (x == "#" ? 1 : 0), 0);
  return sum + p;
}, 0);
//})();

console.log(monitor.map((l) => l.join("")).join("\n"));
console.log({ result });

//EOARGPHYAO

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const data = input.map((line) => {
  const [cave, ...tunnels] = [...line.matchAll(/[A-Z]{2}/g)].map((m) => m[0]);
  const [valve] = line.match(/\d+/);
  return [cave, { tunnels, valve: parseInt(valve) }];
});

const map = new Map(data);

console.log(map);

let cache = new Map();

function maxFlow(cave, open, minutes_left) {
  const key = `${cave}-${[...open.keys()].join(",")}-${minutes_left}`;
  if (cache.has(key)) return cache.get(key);

  if (minutes_left <= 0) return 0;

  let best = 0;
  if (!open.has(cave)) {
    let val = (minutes_left - 1) * map.get(cave).valve;
    let curr_open = new Set([...open]);
    curr_open.add(cave);
    for (let tunnel of map.get(cave).tunnels) {
      if (val != 0) {
        best = Math.max(
          best,
          val + maxFlow(tunnel, curr_open, minutes_left - 2)
        );
      }
      best = Math.max(best, maxFlow(tunnel, curr_open, minutes_left - 1));
    }
  }
  return best;
}

let result = maxFlow("AA", new Set(), 30);
console.log({ result });

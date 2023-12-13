const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const data = input.map((line) => {
  const [cave, ...tunnels] = [...line.matchAll(/[A-Z]{2}/g)].map((m) => m[0]);
  const [preassure] = line.match(/\d+/);
  return [
    cave,
    {
      tunnels: new Map(tunnels.map((t) => [t, 1])),
      preassure: parseInt(preassure),
    },
  ];
});

const map = new Map(data);

//console.log(map);

let cache = new Map();
let cachehit = 0;
function maxFlow(cave, open, minutes_left) {
  if (minutes_left <= 0) return 0;

  const key = `${cave}-${[...open.keys()].sort().join(",")}-${minutes_left}`;
  if (cache.has(key)) {
    cachehit++;
    return cache.get(key);
  }

  let best = 0;
  if (!open.has(cave)) {
    let val = (minutes_left - 1) * map.get(cave).preassure;
    let curr_open = new Set([...open]);
    curr_open.add(cave);
    for (let [tunnel, cost] of map.get(cave).tunnels) {
      if (val != 0) {
        best = Math.max(
          best,
          val + maxFlow(tunnel, curr_open, minutes_left - cost - 1)
        );
      }
      best = Math.max(best, maxFlow(tunnel, curr_open, minutes_left - cost));
    }
  }
  cache.set(key, best);
  return best;
}

let result = maxFlow("AA", new Set(), 30);
console.log({ result, cachehit });

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();
const lines = input.split("\n");

const seeds = [...lines.shift().matchAll(/(\d+)/g)].map((m) => parseInt(m[1]));

const maps = lines.reduce((maps, line) => {
  if (line.trim() == "") return maps;

  if (/map:/.test(line)) {
    maps.push([]);
  } else {
    const [dest, source, count] = line.split(" ").map((x) => parseInt(x));

    maps.at(-1).push({
      sourceStart: source,
      sourceEnd: source + count - 1,
      destStart: dest,
      count,
    });
  }

  return maps;
}, []);

const destinations = seeds.map((seed) => {
  return maps.reduce((dest, map) => {
    const destRange = map.find((r) => {
      return dest >= r.sourceStart && dest <= r.sourceEnd;
    });
    if (destRange) return destRange.destStart + (dest - destRange.sourceStart);
    return dest;
  }, seed);
});

let result = Math.min(...destinations);
console.log({ result });

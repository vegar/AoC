const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();
let lines = input.split("\n");

const seedRanges = [...lines.shift().matchAll(/(\d+)/g)].map((m) =>
  parseInt(m[1])
);

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

  return maps.sort((a, b) => a.sourceStart - b.sourceStart);
}, []);

let minDest = -1;

const findRange = (ranges, source) => {
  return ranges.find((r) => source >= r.sourceStart && source <= r.sourceEnd);
};

const destinations = (map, { start, count }) => {
  console.group(`finding destinations for ${start}-${start + count - 1}`);
  try {
    let c = count;
    let currentStart = start;
    const destinations = [];
    while (c > 0) {
      console.log(`needing ${c} more elements`);
      const r = findRange(map, currentStart);
      if (!r) {
        const nextRange = map.find((x) => x.sourceStart > currentStart);
        const seedsToNext = nextRange
          ? nextRange.sourceStart - currentStart
          : c;
        const takenCount = Math.min(c, seedsToNext);
        destinations.push({ start: currentStart, count: takenCount });
        currentStart += takenCount;
        c -= takenCount;
      } else {
        console.log(
          `found range: ${r.sourceStart}-${r.sourceEnd}, for ${currentStart}-${c}`
        );

        let matchedCount = Math.min(r.sourceEnd - currentStart + 1, c);
        destinations.push({
          start: r.destStart + (currentStart - r.sourceStart),
          count: matchedCount,
        });
        currentStart += matchedCount;
        c -= matchedCount;
      }
    }
    return destinations;
  } finally {
    console.groupEnd();
  }
};

let dest = [];
for (let i = 0; i < seedRanges.length; i += 2) {
  let firstSeed = seedRanges[i];
  let seedCount = seedRanges[i + 1];
  dest.push({ start: firstSeed, count: seedCount });
}

const mapDestinations = (map, dest) => {
  return dest.reduce((agg, curr) => [...agg, ...destinations(map, curr)], []);
};

const mergeDestinations = (dest) => {
  return dest
    .sort((a, b) => a.start - b.start)
    .reduce((acc, curr, idx) => {
      if (idx == 0) {
        acc.push(curr);
      } else {
        const prev = acc.at(-1);
        if (curr.start == prev.start + prev.count) {
          prev.count += curr.count;
        } else {
          acc.push(curr);
        }
      }

      return acc;
    }, []);
};

const finalDestinations = maps.reduce((d, map, idx) => {
  console.group(`mapping ${d.length} destinations for the ${idx}-th map`);
  console.log(`source`, d);
  try {
    const d2 = mapDestinations(map, d);
    console.log(`dest`, d2);
    return d2;
  } finally {
    console.groupEnd();
  }
}, dest);

let result = Math.min(...finalDestinations.map((x) => x.start));
console.log({ result });

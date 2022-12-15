const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/)
  .map((line) => [...line.matchAll(/-?\d+/g)].map((m) => parseInt(m[0])));

const minY = 0;
const maxY = 4000000;
const grid = [];
for (let y = minY; y <= maxY; y++) grid.push(new Range(minY, maxY));

function handleSensor(sensorx, sensory, beaconx, beacony) {
  const dist = Math.abs(beaconx - sensorx) + Math.abs(beacony - sensory);
  for (let y = sensory - dist; y <= sensory + dist; y++) {
    if (y >= minY && y <= maxY) {
      let r = grid[y];
      const distToYY = Math.abs(y - sensory);
      r.remove(
        sensorx - Math.abs(dist - distToYY),
        sensorx + Math.abs(dist - distToYY)
      );
    }
  }
}

for (let i = 0; i < input.length; i++) {
  const [sensorx, sensory, beaconx, beacony] = input[i];
  handleSensor(sensorx, sensory, beaconx, beacony);
}

const [y, x] = grid
  .map((r, idx) => [idx, r.intervals()])
  .filter(([y, i]) => i.length > 0)
  .map(([y, i]) => [y, i.flat()[0]]);
console.log({ x, y });

let result = y + x * 400000;
console.log({ result });

function Range(start, end) {
  const min = start;
  const max = end;
  const intervals = [{ start, end }];

  return {
    remove: (from, to) => {
      let startInterval = null;
      let endInterval = null;
      const enclosed = [];
      for (let i = 0; i < intervals.length; i++) {
        const int = intervals[i];
        if (int.start <= from && int.end >= from) startInterval = [int, i];
        if (int.end >= to && int.start <= to) endInterval = [int, i];

        if (int.start >= from && int.end <= to) enclosed.push(int);

        if (startInterval && endInterval) break;
      }

      if (startInterval && endInterval) {
        const first = { start: startInterval[0].start, end: from - 1 };
        const last = { start: to + 1, end: endInterval[0].end };

        const newInts = [];
        if (first.start <= first.end) newInts.push(first);
        if (last.start <= last.end) newInts.push(last);
        intervals.splice(
          startInterval[1],
          endInterval[1] - startInterval[1] + 1,
          ...newInts
        );
      } else if (startInterval) {
        startInterval[0].end = from - 1;
        if (startInterval[0].end < startInterval[0].start)
          intervals.splice(startInterval[1], 1);
      } else if (endInterval) {
        endInterval[0].start = to + 1;
        if (endInterval[0].end < endInterval[0].start)
          intervals.splice(endInterval[1], 1);
      }

      if (enclosed.length > 0) {
        for (let intToRemove of enclosed) {
          var idx = intervals.findIndex(
            (i) => i.start == intToRemove.start && i.end == intToRemove.end
          );

          if (idx >= 0) intervals.splice(idx, 1);
        }
      }
    },
    list: () => intervals.map((i) => `[${i.start},${i.end}]`).join(","),
    intervals: () =>
      intervals.map((i) => (i.start == i.end ? [i.start] : [i.start, i.end])),
  };
}

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let energized = new Set();
let map = input.split(`\n`).map((row) => row.split(""));

let beams = [{ x: -1, y: 0, dx: 1, dy: 0 }];

log = (beam, map, prefix, postfix) => {
  if (!beam) console.log("*");
  else {
    let k = key(beam);
    let s =
      beam.dx == 0 ? (beam.dy == -1 ? "↑" : "↓") : beam.dx == -1 ? "←" : "→";

    console.log(
      `${prefix ?? ""}${k}: ${s} [${map[beam.y][beam.x]}]${postfix ?? ""}`
    );
  }
};

const key = (beam) => `${beam.x}:${beam.y}`;

const turnCW = (beam) => {
  return {
    ...beam,
    dx: beam.dx == 0 ? beam.dy * -1 : 0,
    dy: beam.dy == 0 ? beam.dx : 0,
  };
};

const turnCCW = (beam) => {
  return {
    ...beam,
    dx: beam.dx == 0 ? beam.dy : 0,
    dy: beam.dy == 0 ? beam.dx * -1 : 0,
  };
};

const splitVert = (beam) => {
  if (beam.dx == 0) return [beam];
  return [turnCCW(beam), turnCW(beam)];
};

const splitHorz = (beam) => {
  if (beam.dy == 0) return [beam];
  return [turnCCW(beam), turnCW(beam)];
};

const cacheKey = (beam) => `${beam.x}:${beam.y}-${beam.dx}:${beam.dy}`;
const cache = new Set();

const isHorz = (beam) => beam.dx != 0;

const step = (beam, map) => {
  if (cache.has(cacheKey(beam))) {
    console.log("cachehit");
    return [];
  }
  cache.add(cacheKey(beam));

  let newBeam = { ...beam, x: beam.x + beam.dx, y: beam.y + beam.dy };

  // out of bounds?
  if (
    newBeam.x < 0 ||
    newBeam.x >= map[0].length ||
    newBeam.y < 0 ||
    newBeam.y >= map.length
  )
    return [];

  // energize!
  energized.add(key(newBeam));

  let tile = map[newBeam.y][newBeam.x];
  if (tile == ".") return [newBeam];
  if (tile == "\\") return [isHorz(beam) ? turnCW(newBeam) : turnCCW(newBeam)];
  if (tile == "/") return [isHorz(beam) ? turnCCW(newBeam) : turnCW(newBeam)];
  if (tile == "|") return splitVert(newBeam);
  if (tile == "-") return splitHorz(newBeam);
};

while (beams.length) {
  let beam = beams.shift();
  while (beam) {
    [beam, newBeam] = step(beam, map);
    //log(beam, map);
    if (newBeam) {
      //log(newBeam, map, "    new beam: ");
      beams.push(newBeam);
    }
  }
}

console.log(energized);
let result = energized.size;
console.log({ result });

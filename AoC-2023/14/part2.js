const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((line) => line.split(""));

const getCol = (map, col) => map.map((r) => r[col]);

const logMap = (map) => {
  console.log(map.map((r) => r.join("")).join("\n"));
};

const spinCol = (col) => {
  let newCol = Array(col.length).fill(".");
  let pos = 0;
  for (let x = 0; x < col.length; x++) {
    if (col[x] == "#") {
      newCol[x] = "#";
      pos = x + 1;
    }
    if (col[x] == "O") {
      newCol[pos] = "O";
      pos++;
    }
  }
  return newCol;
};

const spinUp = (map) => {
  let newMap = Array(map.length);
  for (let x = 0; x < map[0].length; x++) {
    const col = spinCol(getCol(map, x));
    for (let y = 0; y < col.length; y++) {
      if (x == 0) newMap[y] = [];
      newMap[y].push(col[y]);
    }
  }
  return newMap;
};

const spinLeft = (map) => {
  let newMap = map.map((e) => spinCol(e));
  return newMap;
};

const spinRight = (map) => {
  return map.map((e) => spinCol(e.reverse()).reverse());
};

const spinDown = (map) => {
  let newMap = Array(map.length);
  for (let x = 0; x < map[0].length; x++) {
    const col = spinCol(getCol(map, x).reverse()).reverse();
    for (let y = 0; y < col.length; y++) {
      if (x == 0) newMap[y] = [];
      newMap[y].push(col[y]);
    }
  }
  return newMap;
};

const countWeight = (col) => {
  let result = 0;
  let weight = col.length;
  let idx = 0;
  while (idx < col.length) {
    if (col[idx] == "O") {
      result += weight;
      idx++;
      weight--;
    } else if (col[idx] == ".") {
      idx++;
    } else if (col[idx] == "#") {
      weight = col.length - idx - 1;
      idx++;
    }
  }
  return result;
};

const cache = new Map();
const cycle = (map, x) => {
  const key = map.map((r) => r.join("")).join("");

  if (cache.has(key)) {
    let { newMap, x: newX } = cache.get(key);
    //console.log(`found cycle at ${x} - ${newX}`);
    let cycleLenght = x - newX;
    //console.log(`cycleLength = ${cycleLenght}`);
    return { newMap, cycleLenght };
  }

  let newMap = spinRight(spinDown(spinLeft(spinUp(map))));
  console.log(`add to ${x} to cache`);
  cache.set(key, { newMap, x });
  return { newMap, cycleLenght: 0 };
};

const totalWeight = (map) =>
  map.reduce((weight, row, idx) => {
    return weight + (map.length - idx) * row.filter((x) => x == "O").length;
  }, 0);

console.log(0, totalWeight(map));
let firstCycle = cycle(map, 1).newMap;
console.log(1, totalWeight(firstCycle));
console.log("first cycle: ");
logMap(firstCycle);
console.log();
cache.clear();

const target = 1000000000;
let found = false;
logMap(map);
let newMap = map;
let x = 1;
while (x <= target) {
  let { newMap: m, cycleLenght } = cycle(newMap, x);
  newMap = m;
  if (cycleLenght) {
    while (x + cycleLenght < target) x += cycleLenght;
    console.log(`skipping to ${x}`);
    cache.clear();
    found = true;
  }
  console.log(x, totalWeight(newMap));
  x++;
}
console.log();
logMap(newMap);

let result = totalWeight(newMap);

console.log({ result });

/*




*/

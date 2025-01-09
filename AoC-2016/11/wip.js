// const input = require("fs")
//   .readFileSync(require("path").join(__dirname, "input-sample.txt"), "utf8")
//   .trim()
//   .split("\n");

/*
The first floor contains 
1 a polonium generator,  
2 a thulium generator, 
  a thulium-compatible microchip, 
3 a promethium generator, 
4 a ruthenium generator, 
  a ruthenium-compatible microchip, 
5 a cobalt generator, and 
  a cobalt-compatible microchip.
The second floor contains 
  a polonium-compatible microchip and 
  a promethium-compatible microchip.

*/

const CHIP = 1
const GEN = 0

const countbits = (number) => {
  let count = 0;
  while (number > 0) {
    count += number & 1;
    number >>= 1;
  }
  return count;
};

const summary = (floor) => {
  let pairs = floor[GEN] & floor[CHIP];
  let generators = floor[GEN] & ~floor[CHIP];
  let chips = floor[CHIP] & ~floor[GEN];

  return { pairs, generators, chips };
};

const hash = (building, elevator) => {
  return building
    .map((floor, idx) => {
      let { pairs, generators, chips } = summary(floor);
      let e = idx == elevator;

      return `${e ? "E" : " "} P${countbits(pairs)} G${countbits(
        generators
      )} M${countbits(chips)}`;
    })
    .join("|");
};

const valid = (building, elevator) => {
  return building.every((floor) => {
    let { _, generators, chips } = summary(floor);

    return chips == 0 || generators == 0;
  });
};

const firstBitSet = (number) => {
  if (!number) return -1;

  let idx = 0;
  while (number > 0) {
    if (number & 1) return idx;
    idx++;
    number >>= 1;
  }
  return idx;
};

const bitsSet = (number) => {
  let bits = [];
  let idx = 0;
  while (number > 0) {
    if (number & 1) bits.push(1 << idx);
    number >>= 1;
    idx++;
  }

  return bits;
};

const clone = (building) => {
  return building.map((f) => [...f]);
};

const done = (building, elevator) => {
  return building.every((floor, idx) => {
    return idx == building.length - 1 ? true : floor[GEN] + floor[CHIP] == 0;
  });
};

const moves = (building, elevator) => {
  let floor = building[elevator];

  let m = [];
  for (let direction = 1; direction >= -1; direction -= 2) {
    let newElevator = elevator + direction;

    if (newElevator < building.length && newElevator >= 0) {
      // prefer pair - pair is always safe, and always closer to solution
      let genAndchip = floor[GEN] & floor[CHIP];
      if (genAndchip & (direction == 1)) {
        let idx = firstBitSet(genAndchip);
        let newBuilding = clone(building);
        newBuilding[elevator][GEN] -= 1 << idx;
        newBuilding[elevator][CHIP] -= 1 << idx;
        newBuilding[newElevator][GEN] += 1 << idx;
        newBuilding[newElevator][CHIP] += 1 << idx;

        m.push([newBuilding, newElevator]);
      }

      // There should only be either chips or generators available.
      // since any chip that ain't paired up with a generator will fry if there are other generators available
      let { _, chips, generators } = summary(floor);

      let genItems = bitsSet(floor[GEN]).map((x) => [x, GEN]);
      let chipItems = bitsSet(floor[CHIP]).map((x) => [x, CHIP]);

      let items = genItems.concat(chipItems);
      for (let x = 0; x < items.length; x++) {
        let newBuilding = clone(building);

        let [val, type] = items[x];

        newBuilding[elevator][type] -= val;
        newBuilding[newElevator][type] += val;
        if (valid(newBuilding)) m.push([newBuilding, newElevator]);

        for (let y = x + 1; y < items.length; y++) {
          let newBuilding = clone(building);
          newBuilding[elevator][type] -= val;
          newBuilding[newElevator][type] += val;

          let [valy, typey] = items[y];
          newBuilding[elevator][typey] -= valy;
          newBuilding[newElevator][typey] += valy;

          if (valid(newBuilding)) m.push([newBuilding, newElevator]);
        }
      }
    }
  }

  //console.log(JSON.stringify(m, undefined, 2))
  return m;
};

const sample = false;

const input = sample
  ? [
      //G    M
      [0b00, 0b11],
      [0b01, 0b00],
      [0b10, 0b00],
      [0b0, 0b0],
    ]
  : [
      [0b1111111, 0b1111010],
      [0b00000, 0b00101],
      [0b0, 0b0],
      [0b0, 0b0],
    ];

let queue = [[input, 0, 0, [hash(input, 0)]]];
let seen = new Map();
let minSteps = 0;
while (queue.length) {
  let [building, elevator, steps, path] = queue.shift();
  let h = hash(building, elevator);
  console.log(`${steps.toString().padStart(2)} - ${h}`);

  if (done(building, elevator)) {
    console.log(`FOUND! ${h}`);
    console.log("Path: ");
    path.forEach((p) => console.log(`   ${p}`));
    minSteps = steps;
    break;
  }

  if (steps == 11) console.log(steps, hash(building, elevator));

  for (let [newBuilding, newElevator] of moves(building, elevator)) {
    console.log(`      →${hash(newBuilding, newElevator)}`);
    let h = hash(newBuilding, newElevator);
    if (seen.has(h)) {
      continue;
    }

    seen.set(h, steps + 1);
    queue.push([newBuilding, newElevator, steps + 1, [...path, h]]);
  }
}

let result = minSteps;
console.log({ result });

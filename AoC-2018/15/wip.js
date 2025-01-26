const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let NumberOfElfs = 0;
let OriginalCreatures = [];
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] == "G" || input[y][x] == "E") {
      OriginalCreatures.push({
        type: input[y][x],
        hp: 200,
        x,
        y,
        id: OriginalCreatures.length,
      });
      NumberOfElfs += input[y][x] == "E" ? 1 : 0;
      input[y][x] = ".";
    }
  }
}

const draw = (map, creatures) => {
  const creaturePositions = creatures.reduce((map, creature) => {
    map.set(`${creature.y}:${creature.x}`, creature);
    return map;
  }, new Map());

  console.log(
    `   ${Array(map[0].length)
      .fill("")
      .map((_, idx) => idx.toString().at(-1))
      .join("")}`
  );

  for (let y = 0; y < map.length; y++) {
    let row = y.toString().padStart(2) + " ";
    for (let x = 0; x < map[y].length; x++) {
      row += creaturePositions.get(`${y}:${x}`)?.type ?? map[y][x];
    }

    let hp = creatures
      .filter((c) => c.y == y)
      .sort((a, b) => a.x - b.x)
      .map((c) => `${c.type}${c.id}(${c.hp})`)
      .join(", ");
    row += `   ${hp}`;
    console.log(row);
  }
};

const findCreature =
  ({ y, x }) =>
  (c) =>
    c.x == x && c.y == y;

const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const nextToEnemy = (cratures, creature) => {
  const enemies = cratures
    .filter(
      (c) => c.type != creature.type && dist(c, creature) == 1 && c.hp > 0
    )
    .sort((a, b) =>
      a.hp == b.hp ? (a.y == b.y ? a.x - b.x : a.y - b.y) : a.hp - b.hp
    );

  return enemies[0];
};

const isFree = (map, creatures, { y, x }) => {
  if (x < 0 || y < 0 || y >= map.length || x >= map[0].length) return false;
  if (map[y][x] == "#") return false;
  let c = creatures.find(findCreature({ y, x }));
  if (c) return false;
  return true;
};

const findOpenSquares = (map, creatures, creature) => {
  let openSquares = [];
  for (let c of creatures) {
    if (c == creature) continue;
    if (c.type == creature.type) continue;
    if (c.hp <= 0) continue;

    if (isFree(map, creatures, { y: c.y - 1, x: c.x }))
      openSquares.push({ y: c.y - 1, x: c.x, creature: c });
    if (isFree(map, creatures, { y: c.y, x: c.x - 1 }))
      openSquares.push({ y: c.y, x: c.x - 1, creature: c });
    if (isFree(map, creatures, { y: c.y, x: c.x + 1 }))
      openSquares.push({ y: c.y, x: c.x + 1, creature: c });
    if (isFree(map, creatures, { y: c.y + 1, x: c.x }))
      openSquares.push({ y: c.y + 1, x: c.x, creature: c });
  }
  return openSquares;
};

class PriorityQueue {
  #queue;
  constructor() {
    this.#queue = [];
  }

  enqueue(item, priority) {
    let idx = this.#queue.findIndex((i) => i.priority >= priority);
    if (idx == -1) this.#queue.push({ item, priority });
    else this.#queue.splice(idx, 0, { item, priority });
  }

  head() {
    return this.#queue[0].item;
  }
  tail() {
    return this.#queue[this.#queue.length - 1].item;
  }

  get() {
    return this.#queue.shift();
  }
  isEmpty() {
    return this.#queue.length == 0;
  }

  toString() {
    return this.#queue.map(
      (v, idx) => `${idx}: ${v.item.toString()} (pri:${v.priority})`
    );
  }
}

const findPath = (from, to, map, creatures) => {
  let queue = new PriorityQueue();
  queue.enqueue({ y: from.y, x: from.x, steps: 0, path: [] }, 1);
  let seen = new Map();
  let minSeen = Infinity;
  let minPath = [];
  let queuedToVisit = new Map();
  while (!queue.isEmpty()) {
    let item = queue.get().item;
    let { y, x, steps, path } = item;

    // Nådd målet?
    if (x == to.x && y == to.y) {
      if (steps < minSeen) {
        minSeen = steps;
        minPath = path;
      } else if (steps == minSeen) {
        let { x: fx, y: fy } = path[0];
        let { x: px, y: py } = minPath[0];

        if (fy < py || (fy == py && fx < px)) {
          minSeen = steps;
          minPath = path;
        }
      }
      continue;
    }

    // Vært her før?
    if ((seen.get(`${x}:${y}`) || Infinity) < steps) {
      continue;
    }

    // breadcrumb
    seen.set(`${x}:${y}`, steps);

    const conditionalqueue = (map, x, y, dx, dy) => {
      if (
        x + dx < 0 ||
        y + dy < 0 ||
        x + dx > map[0].length - 1 ||
        y + dy > map.length - 1
      )
        return;

      if (isFree(map, creatures, { x: x + dx, y: y + dy })) {
        let heuristic = Math.abs(x + dx - to.x) + Math.abs(y + dy - to.y);
        queuedToVisit.set(`${x + dx}:${y + dy}`, steps + 1);
        queue.enqueue(
          {
            x: x + dx,
            y: y + dy,
            steps: steps + 1,
            path: [...path, { x: x + dx, y: y + dy }],
          },
          steps + 1 + heuristic
        );
      }
    };

    // hvor videre?
    conditionalqueue(map, x, y, 0, -1);
    conditionalqueue(map, x, y, -1, 0);
    conditionalqueue(map, x, y, 1, 0);
    conditionalqueue(map, x, y, 0, 1);
  }

  //draw(map, seen, minPath);
  if (minSeen < Infinity) return [minPath.length, minPath];
  return [Infinity, []];
};

const findPath2 = (from, to, map, creatures) => {
  const distances = new Map();
  const seen = new Set();
  let queue = [{ y: from.y, x: from.x, steps: 0 }];

  while (queue.length > 0) {
    let { x, y, steps } = queue.shift();

    if (seen.has(`${x}:${y}`)) continue;

    seen.add(`${x}:${y}`);
    distances.set(`${x}:${y}`, steps);

    if (isFree(map, creatures, { y: y - 1, x }))
      queue.push({ y: y - 1, x, steps: steps + 1 });
    if (isFree(map, creatures, { y, x: x - 1 }))
      queue.push({ y, x: x - 1, steps: steps + 1 });
    if (isFree(map, creatures, { y, x: x + 1 }))
      queue.push({ y, x: x + 1, steps: steps + 1 });
    if (isFree(map, creatures, { y: y + 1, x }))
      queue.push({ y: y + 1, x, steps: steps + 1 });
  }

  return to
    .filter(({ x, y }) => distances.has(`${x}:${y}`))
    .map(({ x, y }) => ({ x, y, steps: distances.get(`${x}:${y}`) }))
    .sort((a, b) => a.steps - b.steps)
    .filter((a, idx, list) => a.steps == list[0].steps)
    .sort((a, b) => (a.y == b.y ? a.x - b.x : a.y - b.y));
};

const moveCreature = (creatures, creature, where) => {
  creature.x = where.x;
  creature.y = where.y;
};

let ElfPower = 4;

const playCreature = (map, creatures, creature, elfPower, log = false) => {
  if (creature.hp <= 0) return;
  if (log) console.log(`Playing creature`, creature);
  let enemy = nextToEnemy(creatures, creature);
  if (enemy) {
    if (log) console.log(`   ${creature.id} picking fight with ${enemy.id}`);
    enemy.hp -= creature.type == "G" ? 3 : elfPower;
    return;
  }

  const options = findOpenSquares(map, creatures, creature);
  if (log) console.log(`  Open squares: `);
  if (log) console.log(options); //options.forEach((o) => console.log(`   ${o}`));
  const [shortest, ..._] = findPath2(creature, options, map, creatures);
  if (log) console.log("  Shortest: ");
  if (log) console.log(shortest);

  if (!shortest) {
    if (log) console.log("  No where to go....");
    return;
  }

  const [start, ...r] = findPath2(
    shortest,
    [
      { x: creature.x, y: creature.y - 1 },
      { x: creature.x - 1, y: creature.y },
      { x: creature.x + 1, y: creature.y },
      { x: creature.x, y: creature.y + 1 },
    ],
    map,
    creatures
  );
  moveCreature(creatures, creature, start);

  enemy = nextToEnemy(creatures, creature);
  if (enemy) {
    if (log) console.log(`   ${creature.id} picking fight with ${enemy.id}`);
    enemy.hp -= creature.type == "G" ? 3 : elfPower;
    return;
  }
};

const readingOrder = (a, b) => (a.y == b.y ? a.x - b.x : a.y - b.y);

const battleOver = (creatures) =>
  creatures.filter((c) => c.hp > 0).every((c) => c.type == creatures[0].type);

const playRound = (map, creatures, round, elfPower, log = false) => {
  if (log) console.log(`Creatures left: `);
  if (log) creatures.forEach((c) => console.log(c));

  for (let c of creatures.sort(readingOrder)) {
    if (battleOver(creatures)) throw {};
    if (c.hp > 0)
      playCreature(
        map,
        creatures.filter((x) => x.hp >= 0),
        c,
        elfPower,
        log
      );
  }
  return creatures.filter((c) => c.hp > 0);
};

//draw(input, creatures);

const simulate = (map, creatures, elfPower) => {
  console.log(`Trying ElfPower ${elfPower}`);
  let result = 0;
  let x = 1;
  while (true) {
    try {
      creatures = playRound(input, creatures, x, elfPower, (log = false));
    } catch (e) {
      console.log({ e });
      console.log(`Battle ended during round ${x}`);
      creatures = creatures.filter((c) => c.hp > 0);
      const elfs = creatures.filter((g) => g.type == "E").length;
      if (elfs < NumberOfElfs) return -1;
      //draw(input, creatures);
      const restHP = creatures.reduce((acc, c) => acc + c.hp, 0);
      console.log(`Result = ${x - 1} * ${restHP} = ${(x - 1) * restHP}`);
      result = (x - 1) * restHP;
      return result;
    }
    //console.log(`After ${x} rounds:`);
    //draw(input, creatures);
    x++;
  }
};

let result = -1;
elfPower = 4;
while (true) {
  result = simulate(
    input,
    [...OriginalCreatures.map((x) => ({ ...x }))],
    elfPower
  );
  if (result > 0) {
    console.log({ elfPower });
    break;
  }
  elfPower++;
}

console.log({ result });

// Result = 83 * 2528 = 209824
// { result: 209824 }
// To high!

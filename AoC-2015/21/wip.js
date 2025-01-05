const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => parseInt(l.split(":").at(-1)));

const Weapons = [
  { name: "Dagger", cost: 8, damage: 4, armor: 0 },
  { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
  { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
  { name: "Longsword", cost: 40, damage: 7, armor: 0 },
  { name: "Greataxe", cost: 74, damage: 8, armor: 0 },
];

const Armor = [
  { name: "None", cost: 0, damage: 0, armor: 0 },
  { name: "Leather", cost: 13, damage: 0, armor: 1 },
  { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
  { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
  { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
  { name: "Platemail", cost: 102, damage: 0, armor: 5 },
];

const Rings = [
  { name: "None 1", cost: 0, damage: 0, armor: 0 },
  { name: "None 2", cost: 0, damage: 0, armor: 0 },
  { name: "None 3", cost: 0, damage: 0, armor: 0 },
  { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
  { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
  { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
  { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
  { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
  { name: "Defense +3", cost: 80, damage: 0, armor: 3 },
];

const Boss = {
  name: "boss",
  hp: 100,
  damage: 8,
  armor: 2,
};

let Me = {
  name: "player",
  hp: 100,
  damage: 0,
  armor: 0,
};

const attack = (attacker, target) => {
  return target.hp - Math.max(1, attacker.damage - target.armor);
};

const key = (attacker, target) =>
  `${attacker.hp}.${attacker.damage}.${attacker.armor}:${target.hp}.${target.damage}.${target.armor}`;

const simulate = (attacker, target, cache) => {
  let k = key(attacker, target);
  if (cache.has(k)) return cache.get(k);

  let hp = attack(attacker, target);

  if (hp <= 0) {
    const isWin = attacker.name == "player";
    cache.set(k, isWin);
    return isWin;
  }

  return simulate({ ...target, hp: hp }, attacker, cache);
};

const cache = new Map();
console.log(simulate(Me, Boss, cache));

let min = 0;
for (let w of Weapons) {
  for (let a of Armor) {
    for (let r1 = 0; r1 < Rings.length - 2; r1++) {
      let x = Rings[r1];
      for (let r2 = 1; r2 < Rings.length - 1; r2++) {
        let y = Rings[r2];
        for (let r3 = 2; r3 < Rings.length; r3++) {
          let z = Rings[r3];

          if (
            !simulate(
              {
                ...Me,
                damage: w.damage + a.damage + x.damage + y.damage + z.damage,
                armor: w.armor + a.armor + x.armor + y.armor + z.armor,
              },
              Boss,
              cache
            )
          ) {
            let cost = w.cost + a.cost + x.cost + y.cost + z.cost;
            if (cost > min) min = cost;
          }
        }
      }
    }
  }
}

let result = min;
console.log({ result });

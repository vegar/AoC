const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(":"));

const spells = [
  {
    name: "Magic Missle",
    cost: 53,
    timer: 1,
    turn: (time, player, boss) => {
      boss.health -= 4;
    },
  },
  {
    name: "Drain",
    cost: 73,
    timer: 1,
    turn: (time, player, boss) => {
      boss.health -= 2;
      player.health += 2;
    },
  },
  {
    name: "Shield",
    cost: 113,
    timer: 6,
    turn: (time, player, boss) => {
      player.armor = 7;
    },
  },
  {
    name: "Poison",
    cost: 173,
    timer: 6,
    turn: (time, player, boss) => {
      boss.health -= 3;
    },
  },
  {
    name: "Recharge",
    cost: 229,
    timer: 5,
    turn: (time, player, boss) => {
      player.mana += 101;
    },
  },
];

const boss = {
  health: parseInt(input[0][1]),
  damage: parseInt(input[1][1]),
};

const player = {
  health: 50,
  mana: 500,
  armor: 0,
  manaUsed: 0,
};

let minMana = Infinity;
let minUsage = [];

let spellsToUse = [
  "Magic Missle",
  "Magic Missle",
  "Shield",
  "Recharge",
  "Magic Missle",
  "Poison",
  "Magic Missle",
  "Recharge",
  "Poison",
  "Magic Missle",
  "Magic Missle",
];

const run = (player, boss, playersTurn, effects, spellsUsed) => {
  if (player.health <= 0) return false;

  let newEffects = effects
    .map((effect) => {
      effect.turn(effect.timer, player, boss);
      return { ...effect, timer: effect.timer - 1 };
    })
    .filter((effect) => effect.timer > 0);

  if (boss.health <= 0) {
    if (player.manaUsed < minMana) {
      minMana = player.manaUsed;
      minUsage = [...spellsUsed];
    }
    return true;
  }

  if (player.manaUsed > minMana) return false;

  if (playersTurn) {
    player.health -= 1;

    if (player.health <= 0) return false;

    let possible = spells.filter(
      (s) => !newEffects.find((e) => e.name == s.name) && s.cost <= player.mana
    );
    if (possible.length == 0) {
      return false;
    }

    for (let spell of possible) {
      run(
        {
          ...player,
          armor: 0,
          mana: player.mana - spell.cost,
          manaUsed: player.manaUsed + spell.cost,
        },
        { ...boss },
        false,
        [...newEffects, spell],
        [...spellsUsed, spell.name]
      );
    }
  } else {
    player.health -= Math.max(boss.damage - player.armor, 1);
    if (player.health <= 0) {
      return false;
    }

    run({ ...player, armor: 0 }, { ...boss }, true, newEffects, spellsUsed);
  }
};

run(player, boss, true, [], []);

console.log(`Spells used: `, minUsage);
let result = minMana;
console.log({ result });

// 1743 too high
// 1235 too low

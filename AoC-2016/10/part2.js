const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    if (line.startsWith("value")) {
      let [value, bot] = Array.from(line.matchAll(/(\d+)/g), (m) => m[1]);
      return { value: parseInt(value), bot };
    }

    let [_, bot, outlow, low, outhigh, high] = Array.from(
      line.match(/(\d+).*?(\w+) (\d+).*?(\w+) (\d+)/)
    );
    return { bot, outlow, low, outhigh, high };
  });

const bots = new Map();

for (let inst of input) {
  if (inst.value) {
    let bot = bots.get(inst.bot);
    if (!bot) {
      bots.set(inst.bot, { bot: inst.bot, values: [] });
    }

    bots.get(inst.bot).values.push(inst.value);
  } else {
    let bot = bots.get(inst.bot);
    if (!bot) {
      bots.set(inst.bot, { bot: inst.bot, values: [] });
    }
    bots.get(inst.bot).cmd = {
      ...inst,
    };
  }
}

let out = new Map();

let i = 0;
while (true) {
  let found = false;
  for (let bot of bots.values()) {
    if (bot.values.length == 2) {
      found = true;

      if (bot.cmd.outlow == "bot") {
        bots.get(bot.cmd.low).values.push(Math.min(...bot.values));
      }
      if (bot.cmd.outhigh == "bot") {
        bots.get(bot.cmd.high).values.push(Math.max(...bot.values));
      }

      if (bot.cmd.outlow == "output") {
        out.set(bot.cmd.low, Math.min(...bot.values));
      }
      if (bot.cmd.outhigh == "output") {
        out.set(bot.cmd.high, Math.max(...bot.values));
      }

      bot.values = [];
    }
  }

  if (!found) break;
}

let result = out.get("0") * out.get("1") * out.get("2");

console.log({ result });

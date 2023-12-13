const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n\r?\n/);

const operations = {
  "*": (arg) => (value) => value * (arg == "old" ? value : parseInt(arg)),
  "+": (arg) => (value) => value + (arg == "old" ? value : parseInt(arg)),
};

function parseMonkey(input) {
  const lines = input.split(/\r?\n/);
  const [id] = lines[0].match(/(\d+)/);
  const items = lines[1].match(/(\d+)/g);
  const [_, op, arg] = lines[2].match(/old (.) (\d+|old)/);
  const [test] = lines[3].match(/(\d+)/);
  const [t] = lines[4].match(/(\d+)/);
  const [f] = lines[5].match(/(\d+)/);

  return {
    id: parseInt(id),
    items: items.map((i) => parseInt(i, 10)),
    op: op == "*" ? "multiplied" : "increasaed",
    arg,
    operation: operations[op](arg),
    div: test,
    next: (value) => (value % test == 0 ? t : f),
    inspections: 0,
  };
}

const monkeys = input.map(parseMonkey);

function round(monkeys, logger) {
  for (let monkey of monkeys) {
    logger(`Monkey ${monkey.id}`);
    while (monkey.items.length) {
      monkey.inspections += 1;
      let worry = monkey.items.shift();
      logger(`  Monkey inspects an item with a worry level of ${worry}`);
      worry = monkey.operation(worry);
      logger(`    Worry level is ${monkey.op} by ${monkey.arg} to ${worry}`);
      worry = Math.floor(worry / 3);
      logger(
        `    Monkey gets bored with item. Worry level is divid3ed by 3 to ${worry}`
      );
      logger(
        `    Current worry level is ${
          worry % monkey.test == 0 ? "" : "not"
        } divisible by ${monkey.test}`
      );
      let throwTo = monkey.next(worry);
      monkeys[throwTo].items.push(worry);
      logger(
        `    Item with wory level ${worry} is thrown to monkey ${throwTo}`
      );
    }
  }
}

function print(monkeys) {
  for (let monkey of monkeys) {
    console.log(`Monkey ${monkey.id}: ${monkey.items.join(", ")}`);
    console.log(
      `Monkey ${monkey.id} inspected items ${monkey.inspections} times`
    );
  }
}

for (let i = 0; i < 20; i++) {
  round(monkeys, () => {});
}
monkeys.sort((a, b) => b.inspections - a.inspections);
print(monkeys);

let result = monkeys[0].inspections * monkeys[1].inspections;
console.log({ result });

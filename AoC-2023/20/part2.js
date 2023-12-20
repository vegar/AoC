const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const circuit = input.split("\n").reduce((circuit, line) => {
  let [input, outputs] = line.split("->").map((x) => x.trim());
  let type = input.at(0);
  let module = {
    type,
    name: input.substring(1),
    outputs: outputs.split(",").map((o) => o.trim()),
    state: type == "%" ? false : type == "&" ? new Map() : undefined,
    inputs: new Set(),
  };
  circuit.set(module.name, module);
  return circuit;
}, new Map());

for (let m of circuit.values()) {
  for (let o of m.outputs) {
    let outModule = circuit.get(o);
    outModule?.inputs.add(m.name);
  }
}

const modules = {
  b: (module, pulse) => module.outputs.map((o) => [o, pulse, module.name]),
  "%": (module, pulse) => {
    if (pulse == "high") return [];
    module.state = !module.state;
    return module.outputs.map((o) => [
      o,
      module.state ? "high" : "low",
      module.name,
    ]);
  },
  "&": (module, pulse, input) => {
    module.state.set(input, pulse);
    let allHigh = [...module.inputs.values()].every(
      (i) => module.state.get(i) == "high"
    );
    return module.outputs.map((o) => [
      o,
      allHigh ? "low" : "high",
      module.name,
    ]);
  },
};


let feed = [...circuit.values()].find(m => m.outputs.includes('rx'));
let seen = [...feed.inputs.values()].reduce((acc, curr) => acc.set(curr, 0), new Map());
let cycleLengths = new Map();
let pressed = 1;

const sendPulse = () => {
  const queue = [["roadcaster", "low", "button"]];

  while (queue.length) {
    let [name, pulse, input] = queue.shift();
    //console.log(`${input} -${pulse}-> ${name}`)

    if (name == feed.name && pulse == "high") {
      seen.set(input, seen.get(input) + 1);

      if (!cycleLengths.has(input)) {
        console.log(`found cycle for ${input} @ ${pressed}`)
        cycleLengths.set(input, pressed);
      }

      if ([...seen.keys()].every(s => cycleLengths.has(s))) {
        return true;
      }
    }

    let module = circuit.get(name);

    if (module) {
      let outPulses = modules[module.type](module, pulse, input);
      queue.push(...outPulses);
    }
  }

  return false;
};

while (!sendPulse()) pressed++;


console.log(seen, cycleLengths)

const gcd = ([a, b]) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

const lcd = (a, b) => (a / gcd([a, b])) * b;



let result = [...cycleLengths.values()].reduce((acc, curr) => lcd(acc, curr));
console.log({ result });

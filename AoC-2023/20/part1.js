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

const sendPulse = () => {
  let [low, high] = [0, 0];
  const queue = [["roadcaster", "low", "button"]];

  while (queue.length) {
    let [name, pulse, input] = queue.shift();
    //console.log(`${input} -${pulse}-> ${name}`)
    low += pulse == "low" ? 1 : 0;
    high += pulse == "high" ? 1 : 0;

    let module = circuit.get(name);
    if (module) {
      let outPulses = modules[module.type](module, pulse, input);
      queue.push(...outPulses);
    }
  }

  return [low, high];
};

let [low, high] = [0, 0];
for (let i = 0; i < 1000; i++) {
  let [l, h] = sendPulse();
  //console.log(l, h);
  low += l;
  high += h;
}

let result = low * high;
console.log({ result });

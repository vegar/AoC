const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const commands = {
  push: ({ current, idx }) => {
    const subName = input[idx].substring(5);
    current.sub[subName] = {
      name: subName,
      size: 0,
      sub: {},
      parent: current,
    };
    return { current: current.sub[subName], idx: idx + 1 };
  },
  pop: ({ current, idx }) => {
    current.parent.size += current.size;
    return { current: current.parent, idx: idx + 1 };
  },
  ls: ({ current, idx }) => {
    idx++;
    while (idx < input.length && !input[idx].startsWith("$")) {
      if (!input[idx].startsWith("dir"))
        current.size += parseInt(input[idx].split(" ").shift());

      idx++;
    }
    return { current, idx };
  },
};

const execute = ({ current, idx }) => {
  if (input[idx] == "$ cd ..") return commands.pop({ current, idx });
  if (input[idx].startsWith("$ cd")) return commands.push({ current, idx });
  if (input[idx] == "$ ls") return commands.ls({ current, idx });
};

let idx = 1;
let root = { name: "/", size: 0, sub: {}, parent: null };
let current = root;
while (idx < input.length) {
  ({ current, idx } = execute({ current, idx: idx }));
}

let result = 70000000;
const traverse = (folder) => {
  if (folder.size > 8381165) result = Math.min(folder.size, result);
  Object.keys(folder.sub).forEach((f) => traverse(folder.sub[f]));
};

traverse(root);

console.log({ result });

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

console.log(input);

const commands = {
  push: ({ current, idx }) => {
    const subName = input[idx].substring(5);
    console.log(`${idx}: push ${subName}`);
    current.sub[subName] = {
      name: subName,
      size: 0,
      sub: {},
      parent: current,
    };
    return { current: current.sub[subName], idx: idx + 1 };
  },
  pop: ({ current, idx }) => {
    console.log(`${idx}: pop`);

    current.parent.size += current.size;

    return { current: current.parent, idx: idx + 1 };
  },
  ls: ({ current, idx }) => {
    idx++;
    while (idx < input.length && !input[idx].startsWith("$")) {
      console.log(`${idx}: -  '${input[idx].split(" ").slice(1).join("")}'`);
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

  console.error(`no command? ${input[idx]}`);
};

let idx = 1;
let root = { name: "/", size: 0, sub: {}, parent: null };
let current = root;
while (idx < input.length) {
  ({ current, idx } = execute({ current, idx: idx }));
}

let result = 0;
const traverse = (folder) => {
  console.log(`'${folder.name}' - ${folder.size}`);
  if (folder.size < 100000) result += folder.size;
  Object.keys(folder.sub).forEach((f) => traverse(folder.sub[f]));
};

traverse(root);

console.log({ result });

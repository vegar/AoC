const sample = false;

const input = require("fs")
  .readFileSync(
    require("path").join(__dirname, `input${sample ? "-sample" : ""}.txt`),
    "utf8"
  )
  .trim()
  .split("\n")
  .map((line) => {
    let [cmd1, cmd2, ...rest] = line.split(" ");

    return { cmd: cmd1 + " " + cmd2, params: rest };
  });

//console.log(input);

const commands = {
  "rotate left": (pwd, params) => {
    let steps = parseInt(params[0]);
    if (steps == 0) return pwd;

    return pwd.substring(steps) + pwd.substring(0, steps);
  },
  "rotate right": (pwd, params) => {
    let steps = parseInt(params[0]);
    if (steps == 0) return pwd;

    return (
      pwd.substring(pwd.length - steps) + pwd.substring(0, pwd.length - steps)
    );
  },
  "rotate based": (pwd, params) => {
    let steps = pwd.indexOf(params.at(-1));
    steps += steps >= 4 ? 2 : 1;

    while (steps > pwd.length) steps -= pwd.length;

    return (
      pwd.substring(pwd.length - steps) + pwd.substring(0, pwd.length - steps)
    );
  },
  "swap position": (pwd, params) => {
    let x = parseInt(params[0]);
    let y = parseInt(params.at(-1));

    if (y < x) [x, y] = [y, x];

    return (
      pwd.substring(0, x) +
      pwd[y] +
      pwd.substring(x + 1, y) +
      pwd[x] +
      pwd.substring(y + 1)
    );
  },
  "swap letter": (pwd, params) => {
    let x = pwd.indexOf(params[0]);
    let y = pwd.indexOf(params.at(-1));

    if (y < x) [x, y] = [y, x];

    return (
      pwd.substring(0, x) +
      pwd[y] +
      pwd.substring(x + 1, y) +
      pwd[x] +
      pwd.substring(y + 1)
    );
  },
  "reverse positions": (pwd, params) => {
    let x = parseInt(params[0]);
    let y = parseInt(params.at(-1));

    return (
      pwd.substring(0, x) +
      pwd
        .substring(x, y + 1)
        .split("")
        .reverse()
        .join("") +
      pwd.substring(y + 1)
    );
  },
  "move position": (pwd, params) => {
    let x = parseInt(params[0]);
    let y = parseInt(params.at(-1));

    if (x < y)
      return (
        pwd.substring(0, x) +
        pwd.substring(x + 1, y + 1) +
        pwd[x] +
        pwd.substring(y + 1)
      );
    return (
      pwd.substring(0, y) + pwd[x] + pwd.substring(y, x) + pwd.substring(x + 1)
    );
  },
};

let pwd = sample ? "abcde" : "abcdefgh";

for (let { cmd, params } of input) {
  let newpwd = commands[cmd](pwd, params);

  console.log(`${cmd} ${params.join(" ")}\n   ${pwd} -> ${newpwd}`);
  pwd = newpwd;
}

let result = pwd;
console.log({ result });

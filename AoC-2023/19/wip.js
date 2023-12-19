const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let [workflows, parts] = input.split("\n\n").map((i, idx) => {
  if (idx == 0)
    return i.split("\n").map((line) => {
      let [name, checks] = line.split("{");
      checks = checks
        .substring(0, checks.length - 1)
        .split(",")
        .map((check) => {
          if (check.includes(":")) {
            let [_, prop, operator, value, next] = check.match(
              /(\w)([\<\>])(\d+):(\w+)/
            );
            return { prop, operator, value: parseInt(value), next };
          }

          return { next: check };
        });
      return [name, checks];
    });

  return i
    .split("\n")
    .map((line) =>
      Object.fromEntries(
        [...line.matchAll(/(\w)=(\d+)/g)].map((m) => [m[1], parseInt(m[2])])
      )
    );
});

console.log(parts);

const doCheck = (part, check) => {
  return check.operator == ">"
    ? part[check.prop] > check.value
    : part[check.prop] < check.value;
};

workflows = new Map(workflows);
const checkPart = (part, workflow) => {
  let { next } = workflow.find((c) => !c.prop || doCheck(part, c));
  if (next == "A") return true;
  if (next == "R") return false;
  return checkPart(part, workflows.get(next));
};

checkPart(parts[0], workflows.get("in"));

let result = parts.reduce((acc, part, idx) => {
  console.log(` checking part ${idx}`);
  if (checkPart(part, workflows.get("in"))) {
    return acc + part.x + part.m + part.a + part.s;
  }
  return acc;
}, 0);
console.log({ result });

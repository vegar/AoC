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
workflows = new Map(workflows);

const count = (ranges, workflow) => {
  console.group(`${workflow} - ${Object.entries(ranges)}`)
  try {
    if (workflow == "R") return 0;
    if (workflow == "A") return Object.values(ranges).reduce((acc, curr) => acc * (curr[1] - curr[0] + 1), 1);

    let rules = workflows.get(workflow);
    let fallback = rules.pop();

    let sum = 0;
    let doFallback = 0;
    let newRanges = { ...ranges };
    for (let rule of rules) {
      let [start, end] = newRanges[rule.prop];
      let accepted;
      let rejected;
      if (rule.operator == '<') {
        accepted = [start, rule.value - 1];
        rejected = [rule.value, end];
      } else {
        accepted = [rule.value + 1, end];
        rejected = [start, rule.value];
      }
      if (accepted[0] <= accepted[1]) {
        sum += count({ ...newRanges, [rule.prop]: accepted }, rule.next);
      }
      if (rejected[0] <= rejected[1]) {
        console.log(`modify range for next rule`)
        console.log(`  old: ${Object.entries(newRanges)}`)
        newRanges = { ...newRanges, [rule.prop]: rejected }
        console.log(`  new: ${Object.entries(newRanges)}`)
      } else {
        break;
      }
      doFallback++
    }
    if (doFallback == rules.length) {
      console.log(`Fallback, ${fallback.next} for ${Object.entries(newRanges)}`)
      sum += count(newRanges, fallback.next)

    }

    return sum;
  } finally {
    console.groupEnd();
  }
}

const start = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] };

let result = count(start, "in");
console.log({ result });

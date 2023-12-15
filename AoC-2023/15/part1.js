const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(",");

let result = input.reduce((acc, curr) => {
  return (
    acc +
    curr.split("").reduce((sum, letter) => {
      // console.group(
      //   `Next letter is ${letter}, it's ASCII code is ${letter.charCodeAt(0)}`
      // );
      sum += letter.charCodeAt(0);
      // console.log(`current value increases to ${sum}`);
      sum *= 17;
      // console.log(`current value is multiplied by 17 and becomes ${sum}`);
      sum %= 256;
      // console.log(`current value becomes ${sum}`);
      console.groupEnd();
      return sum;
    }, 0)
  );
}, 0);

console.log({ result });

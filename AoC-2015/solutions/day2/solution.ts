import { readFileLines } from "../../lib/fileInput";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const inputFile = fromHere(`solutions/${day}` + "/input.txt");

  const input = readFileLines(inputFile);

  await solveForFirstStar(input);
  await solveForSecondStar(input);
}

async function solveForFirstStar(input) {
  const solution = input
    .map(l => l.split('x').sort((a,b) => a-b))
    .map(pakke => {
      const [w,h,l] = pakke;
      return w*h + (w*h + w*l + l*h) * 2;
    })
    .reduce((acc, curr) => acc + curr, 0)
    .toString();

  report("Solution 1:", solution);
}

async function solveForSecondStar(input) {
  const solution = input
  .map(l => l.split('x').map(x => parseInt(x, 10)).sort((a,b) => a-b))
  .map(pakke => {
    const [w,h,l] = pakke;
    return w+w+h+h+(w*h*l);
  })
  .reduce((acc, curr) => acc + curr, 0)
  .toString();

  report("Solution 2:", solution);
}

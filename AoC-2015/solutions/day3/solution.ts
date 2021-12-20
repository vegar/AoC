import { assert } from "console";
import { readFile } from "../../lib/fileInput";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const inputFile = fromHere(`solutions/${day}` + "/input.txt");

  const input = readFile(inputFile);

  await solveForFirstStar(input);
  await solveForSecondStar(input);
}

async function solveForFirstStar(input) {
  let x = 0;
  let y = 0;
  let positions = new Set<string>();
  positions.add('0,0')
  input.split('').forEach(d => {
    switch (d) {
      case '^': y -= 1; break;
      case '<': x -= 1; break;
      case '>': x += 1; break;
      case 'v': y += 1; break;
    }

    positions.add(`${x},${y}`);
  });

  const solution = positions.size.toString();
  report("Solution 1:", solution);
  assert(solution == '2592');
}

async function solveForSecondStar(input) {
  let sx = 0;
  let sy = 0;
  let rx = 0;
  let ry = 0;
  let positions = new Set<string>();
  positions.add('0,0')
  input.split('').forEach((d,i) => {
    if (i % 2 == 0) {
      switch (d) {
        case '^': sy -= 1; break;
        case '<': sx -= 1; break;
        case '>': sx += 1; break;
        case 'v': sy += 1; break;
      }

      positions.add(`${sx},${sy}`);
    } else {
      switch (d) {
        case '^': ry -= 1; break;
        case '<': rx -= 1; break;
        case '>': rx += 1; break;
        case 'v': ry += 1; break;
      }

      positions.add(`${rx},${ry}`)

    }
  });

  const solution = positions.size.toString();
  report("Solution 2:", solution);

}

import chalk from 'chalk';
import { readFileSync, readlink } from 'fs';
import path from 'path';

import {translate, directions} from './directions.js'

/*  timing */
import { hrtime } from 'process';
const startTime = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)


function readScanners(input) {
  return input.reduce((acc, curr) => {
    if (curr.match(/--- scanner (\d+) ---/)) {
      acc.push({
        scanner: acc.length,
        position: [0,0,0],
        beacons: []
      });
    }
    else if (curr == '') {
      return acc;
    } else {
      const pos = curr.split(',').map(c => parseInt(c));

      acc[acc.length-1].beacons.push(pos);
    }

    return acc;

  }, []);
}

function findMatches(scanner1, scanner2) {
  let rotationIndex = 0;
  let foundMatch = false;
  let translation = [0,0,0];
  while (!foundMatch) {

    // for each beacon in scanner 2...
    for (let beaconUnderTestIdx = 0; beaconUnderTestIdx < scanner2.beacons.length; beaconUnderTestIdx++) {
      const beaconUnderTest = scanner2.beacons[beaconUnderTestIdx];

      // align it with each beacon in scanner 1...
      for (let scanner1BeaconIdx = 0; scanner1BeaconIdx < scanner1.beacons.length; scanner1BeaconIdx++) {
        const [x1, y1, z1] = scanner1.beacons[scanner1BeaconIdx];
        const [x2, y2, z2] = beaconUnderTest;

        // translation:
        translation = [x1-x2, y1-y2, z1-z2];

        // check for matches
        let matches = 0;
        for (let b = 0; b < scanner2.beacons.length; b++) {
          if (b == scanner1BeaconIdx) continue;

          //translate the beacon:
          const [xb, yb,zb] = scanner2.beacons[b];
          const [xt, yt, zt] = [xb+translation[0], yb+translation[1], zb+translation[2]];

          //check if it alignes with any beacon from scanner 1
          if (scanner1.beacons.find(([x,y,z])=> x == xt && y == yt && z == zt)) matches++;
        }

        if (matches >= 12) {
          console.log(chalk.red.bold(`FOUND MATCH!!! Scanner ${scanner1.scanner} -> ${scanner2.scanner} Translation: [${translation[0]}, ${translation[1]}, ${translation[2]}] @ rotation ${rotationIndex} `));
          foundMatch = true;
          break;
        }
      }

      if (foundMatch) break;
    }

    if (!foundMatch) {
      const rotFunc = directions[rotationIndex++];
      // no more rotations to test :-(
      if (!rotFunc) return false;
      // rotate and try again...
      scanner2.beacons = scanner2.beacons.map(rotFunc);
    } else {
      // store scanner 2 position relative to scanner 1
      scanner2.position = translation;
      // and translate all beacons
      scanner2.beacons = scanner2.beacons.map(([x,y,z]) => [x+translation[0], y+translation[1], z+translation[2]]);

      return true;
    }
  }
  return false;
}

function alignScanners(scanners) {
  let unMatchedScanners = scanners.map((s, idx) => idx);
  unMatchedScanners.shift();
  const matchedScanners = [0];

  while (unMatchedScanners.length > 0) {
    console.log(chalk.green(`${unMatchedScanners.length} unmatched scanners`))
    for (const matchedScanner of matchedScanners) {

      unMatchedScanners = unMatchedScanners.filter(i => {
//        console.log(chalk.green(`  checking scanner ${i} against ${matchedScanner}`));
        const found = findMatches(scanners[matchedScanner], scanners[i])
        if (found) {
          matchedScanners.push(i);
          return false;
        }
        return true;
      })
    }
  }
}

const scanners = readScanners(input);
alignScanners(scanners);

const manhatten = (pos1, pos2) => {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]) + Math.abs(pos1[2] - pos2[2])
}

console.log(manhatten([1105,-1205,1229], [-92,-2380,-20]))

let max = 0;
for (let i = 0; i < scanners.length; i++) {
  for (let j = i+1; j < scanners.length; j++) {
    let m = manhatten(scanners[i].position, scanners[j].position);
    if (m > max) max = m;
  }
}


let result = max;
console.log({ result })


/*  timing */
const endTime = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((endTime - startTime) / BigInt(10000)) / 100)
/*  timing */

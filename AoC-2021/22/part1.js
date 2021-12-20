import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


let input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

function size(cuboid) {
  if (Array.isArray(cuboid)) {
    return cuboid.reduce((acc,curr) => acc + size(curr), 0)
  }

  return (cuboid.x[1]-cuboid.x[0] + 1)
       * (cuboid.y[1]-cuboid.y[0] + 1)
       * (cuboid.z[1]-cuboid.z[0] + 1);
}

function valid(c) {
  return c.x[0] <= c.x[1] && c.y[0] <= c.y[1] && c.z[0] <= c.z[1]
}

function clamp(original, toBeClamped) {
  let newCuboid = {
    x: [Math.max(original.x[0], toBeClamped.x[0]), Math.min(original.x[1], toBeClamped.x[1])],
    y: [Math.max(original.y[0], toBeClamped.y[0]), Math.min(original.y[1], toBeClamped.y[1])],
    z: [Math.max(original.z[0], toBeClamped.z[0]), Math.min(original.z[1], toBeClamped.z[1])],
  }

  return valid(newCuboid) ? newCuboid : null;
}

function remove(original, toBeRemovedOriginal) {

  let toBeRemoved = clamp(original, toBeRemovedOriginal);

  if (!toBeRemoved) return original;

  const newCuboids = [
    //split on x
    { x: [original.x[0], toBeRemoved.x[0]-1],
      y: original.y,
      z: original.z
    },
    { x: [toBeRemoved.x[1] + 1, original.x[1]],
      y: original.y,
      z: original.z
    },
    //split on y
    { x: toBeRemoved.x,
      y: [original.y[0], toBeRemoved.y[0]-1],
      z: original.z
    },
    { x: toBeRemoved.x,
      y: [toBeRemoved.y[1]+1, original.y[1]],
      z: original.z
    },
    //split on z
    { x: toBeRemoved.x,
      y: toBeRemoved.y,
      z: [original.z[0], toBeRemoved.z[0]-1],
    },
    { x: toBeRemoved.x,
      y: toBeRemoved.y,
      z: [toBeRemoved.z[1]+1, original.z[1]],
    },
  ];

  return newCuboids
    // filter 'negative' cuboids (where first point is larger then second point)
    .filter(c => valid(c))
    ;
}

function list(cuboid) {
  if (Array.isArray(cuboid)) {
    console.log('----------------------------')
    return cuboid.map(c => list(c))
  }

  return `x:${cuboid.x[0]}..${cuboid.x[1]}, y:${cuboid.y[0]}..${cuboid.y[1]}, z:${cuboid.z[0]}..${cuboid.z[1]}`
}

function listAll(cuboid) {
  if (Array.isArray(cuboid)) {
    console.log('----------------------------')
    cuboid.forEach(c => listAll(c))
    return;
  }

  for (let x = cuboid.x[0]; x <= cuboid.x[1]; x++)
  for (let y = cuboid.y[0]; y <= cuboid.y[1]; y++)
  for (let z = cuboid.z[0]; z <= cuboid.z[1]; z++) {
    console.log(`${x},${y},${z}`)
  }
}

const bounds = {
  x:[-50,50],y:[-50,50],z:[-50,50]
}

const cubes = input.map(line => {
  const [_, op, x1, x2, y1, y2, z1, z2] = line.match(/(\w*) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/);

  return {
    op,
    cuboid: {
      x: [parseInt(x1), parseInt(x2)].sort((a,b) => a - b),
      y: [parseInt(y1), parseInt(y2)].sort((a,b) => a - b),
      z: [parseInt(z1), parseInt(z2)].sort((a,b) => a - b)
    }
  }
})
.map(c => ({op: c.op, cuboid: clamp(bounds, c.cuboid)}))
.filter(c => c.cuboid != null)
.reduce((acc, curr) => {
  let newList;

  let preSize = size(acc);

  if (curr.op == 'on') {
    if (acc.length == 0) newList = [curr.cuboid];
    else {
      //remove current from existing...
      newList = acc.map(c => remove(c, curr.cuboid)).flat();
      if (size(newList) > preSize) {
        listAll(newList)
      }
      //..then add current
      newList.push(curr.cuboid);
    }
  }
  else if (curr.op == 'off') {
    //console.log(`Removing`)
    newList = acc.map(c => {

//      list(acc);

      var n = remove(c, curr.cuboid)
      // n.forEach((cc, idx) => {
      //   let p = idx == 0 ? list(c).padEnd(30, ' ') : ' '.padEnd(30, ' ')
      //   console.log(`${p} -> ${list(cc)}`)
      // })
      return n;
    }
    ).flat();
  //  console.log(`-------`)
    list(newList);
  }

  let postSize = size(newList);

  console.log(`${preSize} -> ${postSize} == ${postSize - preSize}`)
  return newList;
},[])

let result = size(cubes);

//console.log(list(clamp(bounds, {x: [-54112, -39298], y: [-85059, -49293], z: [-2449, 7877]})))


console.log({ result })

/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */

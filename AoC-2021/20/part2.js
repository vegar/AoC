import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)


const algo = input[0].split('');


const originalImage = input.slice(2).map(l => l.split(''));


function getPixelAt(x,y, image, abyss) {
  const pAt = (yy,xx) => {
    if (x+xx < 0 || x+xx > image[0].length-1 || y+yy < 0 || y+yy > image.length-1)
      return abyss;

    return image[y+yy][x+xx];
  }

  const p =
    pAt(-1,-1) + pAt(-1, 0) + pAt(-1,+1) +
    pAt(0,-1) + pAt(0, 0) + pAt(0,+1) +
    pAt(+1,-1) + pAt(+1, 0) + pAt(+1,+1);

  const idx = parseInt(p.split('').map(c => c == '#' ? 1 : 0).join(''), 2)

  return algo[idx];
}

function enhance(image, abyss)  {
  const newImage = [];

  for (let y = 0; y < image.length + 2; y++) {
    let row = [];
    for (let x = 0; x < image[0].length + 2; x++) {
      row.push(getPixelAt(x-1, y-1, image, abyss))
    }
    newImage.push(row);
  }

  //find new infinite abyss
  let idx = parseInt(abyss.repeat(9).split('').map(c => c == '#' ? 1 : 0).join(''), 2)
  let newAbyss = algo[idx];

  return [newImage, newAbyss];
}

function drawImage(image) {
  console.log('-'.repeat(image.length))
  image.map(r => console.log(r.join('')));
  console.log('-'.repeat(image.length))
}


let [newImage, abyss] = [originalImage, '.'];
for (var i = 0; i < 50; i++) {
  [newImage, abyss] = enhance(newImage, abyss);
}

function countPixels(image){
  return image.reduce((acc, row) => {
    let pixelsInRow = row.reduce((acc2, p) => {
      let isPixel = p == '#' ? 1 : 0;
      return acc2 + isPixel;
    }, 0);
    return acc + pixelsInRow;
  }, 0)
}

let result = countPixels(newImage)
console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */

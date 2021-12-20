const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

// read tiles
const tiles = input.reduce((acc, line) =>{
  const title = line.match(/Tile (\d+):/);
  if (title)
  {
    acc.push({ tile: title[1], pixels: [] })
  } else if (line.length){
    const tile = acc.pop();
    tile.pixels.push(line.split('').map(c => c == '#' ? 1 : 0).join(''))
    acc.push(tile)
  }
  return acc;
}, [])

// calculate edges
tiles.forEach(tile => {
  tile.variations = [];
  // rotations
  const top = parseInt(tile.pixels[0], 2)
  const bottom = parseInt(tile.pixels[0], 2)
  const left = parseInt(tile.pixels.map(l => l[0]).join(''), 2)
  const right = parseInt(tile.pixels.map(l => l[l.length-1]).join(''), 2)


});



console.log(tiles)

let result = 0
console.log({ result })

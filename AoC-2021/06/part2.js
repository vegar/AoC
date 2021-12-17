const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim();

//const input = '3,4,3,1,2';
let fish = input.split(',').reduce((map, curr) => {
  if (map.has(curr))
    map.set(curr, map.get(curr) + 1)
  else
    map.set(curr, 1)
  return map;
}, new Map())

for (let day = 1; day <= 256; day++) {
  let newFish = new Map();
  for (const [key, value] of fish) {
    if (key == 0) {
      newFish.set(6, (newFish.get(6) ?? 0) + value)
      newFish.set(8, value)
    }
    else
    {
      newFish.set(key-1, (newFish.get(key-1) ?? 0) + value);
    }
  }
  fish = newFish;

  console.log(`After ${day} days:`, fish)

}

//console.log(fish)

let result = [...fish.values()].reduce((acc, curr) => acc + curr);
console.log({ result })

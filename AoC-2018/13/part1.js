const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .split("\n")
  .map((line) => line.split(""));

const findCarts = (map) => {
  const cartToRail = {
    ">": "-",
    v: "|",
    "^": "|",
    "<": "-",
  };
  const isCart = (map, y, x) => (cartToRail[map[y][x]] ? true : false);

  const carts = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (isCart(map, y, x)) {
        carts.push({
          key: `${y}:${x}`,
          y,
          x,
          intersections: 0,
          direction: map[y][x],
        });
        map[y][x] = cartToRail[map[y][x]];
      }
    }
  }
  return carts;
};

let newDirection = {
  "/": { "^": ">", "<": "v", ">": "^", v: "<" },
  "\\": { "^": "<", ">": "v", "<": "^", v: ">" },
};

const left = {
  ">": "^",
  "^": "<",
  "<": "v",
  v: ">",
};

const right = {
  ">": "v",
  v: "<",
  "<": "^",
  "^": ">",
};

const draw = (map, carts) => {
  const cartPos = new Map(carts.map((c) => [`${c.y}:${c.x}`, c.direction]));
  console.log(cartPos);
  map.forEach((line, y) =>
    console.log(line.map((p, x) => cartPos.get(`${y}:${x}`) || p).join(""))
  );
};

const isTurn = (map, y, x) => map[y][x] == "/" || map[y][x] == "\\";
const isIntersection = (map, y, x) => map[y][x] == "+";

const turnCart = (intersections, direction) => {
  const t = intersections % 3;
  if (t == 0) return left[direction];
  if (t == 1) return direction;
  if (t == 2) return right[direction];
};

const moveCart = (map, cart) => {
  const cartDX = {
    ">": [0, 1],
    v: [1, 0],
    "^": [-1, 0],
    "<": [0, -1],
  };
  let dy = 0;
  let dx = 0;
  try {
    [dy, dx] = cartDX[cart.direction];
  } catch (error) {
    console.log(`Error with cart ${JSON.stringify(cart)}`);
  }
  dy = cart.y + dy;
  dx = cart.x + dx;

  if (isTurn(map, dy, dx)) {
    return {
      ...cart,
      y: dy,
      x: dx,
      direction: newDirection[map[dy][dx]][cart.direction],
    };
  } else if (isIntersection(map, dy, dx)) {
    return {
      ...cart,
      y: dy,
      x: dx,
      intersections: cart.intersections + 1,
      direction: turnCart(cart.intersections, cart.direction),
    };
  } else return { ...cart, y: dy, x: dx };
};

const cartSortFunc = (a, b) => (a.y == b.y ? a.x - b.x : a.y - b.y);

const detectCrash = (carts) =>
  carts.find((c, i) =>
    carts.find((cc, ii) => ii != i && cc.x == c.x && cc.y == c.y)
  );

const tick = (map, carts) => {
  let newCarts = [...carts];
  for (let i = 0; i < carts.length; i++) {
    newCarts[i] = moveCart(map, newCarts[i]);
    if (detectCrash(newCarts)) throw { y: newCarts[i].y, x: newCarts[i].x };
  }
  return newCarts.sort(cartSortFunc);
};

carts = findCarts(input);
console.log(carts);
//draw(input, carts);

let result = "";
while (true) {
  try {
    carts = tick(input, carts);
  } catch (error) {
    console.log("CRASH");
    result = `${error.x},${error.y}`;
    break;
  }

  //draw(input, carts);
  console.log(carts);
}

console.log({ result });

// not correct: 80,68


export const makeTranslate = ([dx, dy, dz]) => ([x,y,z]) => [x+dx, y+dy, z+dz];
export const translate = ([x,y,z], [dx,dy,dz]) => [x+dx, y+dy, z+dz];

export const roll = ([x,y,z]) => {
    return [x, z, -y]
}

export const turn = ([x,y,z]) => {
    return [-y,  x, z]
}

export const directions = [
    (pos) => roll(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),

    (pos) => roll(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),

    (pos) => roll(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),

    (pos) => roll(roll(turn(roll(pos)))),
    (pos) => turn(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),

    (pos) => roll(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),

    (pos) => roll(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),
    (pos) => turn(pos),
];

w = input[0]
// x = 0
// x = x + z
// x = x % 26
// z = z / 1
// x = x + 14
// x = x == w ? 1 : 0
// x = x == 0 ? 1 : 0
if (w == z % 26 + 14) x = 0
else x = 1

// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;

// y = 0
// y = y + w
// y = y + 1
// y = y * x
// z = z + y
y = (w + 1) * x;
z = z + y;


w = input[1]
// x = 0
// x = x + z
// x = x % 26
// z = z / 1
// x = x + 15
// x = x == w ? 1 : 0
// x = x == 0 ? 1 : 0
if (w == z % 26 + 15) x = 0
else x = 1
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = (w + 7) * x;
z = z * y;


w = input[2]
x = 0
x = x + z
x = x % 26
z = z / 1
x = x + 15
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 13
y = y * x
z = z + y

w = input[3]
x = 0
x = x + z
x = x % 26
z = z / 26
x = x + -6
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 10
y = y * x
z = z + y

w = input[4]
x = 0
x = x + z
x = x % 26
z = z / 1
x = x + 14
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 0
y = y * x
z = z + y

w = input[5]
x = 0
x = x + z
x = x % 26
z = z / 26
x = x + -4
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 13
y = y * x
z = z + y

w = input[6]
x = 0
x = x + z
x = x % 26
z = z / 1
x = x + 15
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 11
y = y * x
z = z + y

w = input[7]
x = 0
x = x + z
x = x % 26
z = z / 1
x = x + 15
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 6
y = y * x
z = z + y

w = input[8]
x = 0
x = x + z
x = x % 26
z = z / 1
x = x + 11
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
// y = 0
// y = y + w
// y = y + 1
// y = y * x
// z = z + y

w = input[9]
x = 0
x = x + z
x = x % 26
z = z / 26
x = x + 0
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 7
y = y * x
z = z + y

w = input[10]
x = 0
x = x + z
x = x % 26
z = z / 26
x = x + 0
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 11
y = y * x
z = z + y

w = input[11]
x = 0
x = x + z
x = x % 26
z = z / 26
x = x + -3
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 14
y = y * x
z = z + y

w = input[12]
x = 0
x = x + z
x = x % 26
z = z / 26
x = x + -9
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 4
y = y * x
z = z + y

w = input[13]
x = 0
x = x + z
x = x % 26
z = z / 26
x = x + -9
x = x == w ? 1 : 0
x = x == 0 ? 1 : 0
// y = 0
// y = y + 25
// y = y * x
// y = y + 1
// z = z * y
y = (25 * x) + 1
z = z * y;
y = 0
y = y + w
y = y + 10
y = y * x
z = z + y

import chalk from 'chalk';
import { read, readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()

// const input = '9C0141080250320F1802104A08'


function* nextBits(input) {
  let pos = 0;
  while (pos < input.length) {
    yield parseInt(input[pos], 16).toString(2).padStart(4, '0')
    pos++
  }
}

class BitStream {
  reader
  buffer = [];
  bitPos = 0;

  streamEnd = false;

  constructor (input) {
    this.reader = nextBits(input)
  }

  fillBuffer(minlength = 4) {
    while (this.buffer.length < minlength) {
      let {value, done} = this.reader.next();
      this.streamEnd = done;
      if (done)  return;
      this.buffer.push(...value.split(''))
    }
  }

  take(numberOfBits) {
    this.fillBuffer(numberOfBits);
    this.bitPos += numberOfBits;
    return this.buffer.splice(0, numberOfBits);
  }

  get atEnd() {
    return this.streamEnd;
  }

  get position(){
    return this.bitPos;
  }
}

class PacketParser {
  bitStream;

  constructor(bitStream) {
    this.bitStream = bitStream;
  }

  readNumber(bitLength) {
    return parseInt(this.bitStream.take(bitLength).join(''), 2);
  }

  readLiteralValue() {
    let done = false;
    let number = []
    while (!done) {
      const [prefix, ...bits] = this.bitStream.take(5)
      number.push(...bits)
      done = prefix == '0';
    }

    return parseInt(number.join(''), 2);
  }

  evaluatePacket(packet) {
    const operators = [
      // sum
      (packet) => packet.subPackets.reduce((acc, curr) => acc + this.evaluatePacket(curr), 0),
      // product
      (packet) => packet.subPackets.reduce((acc, curr) => acc * this.evaluatePacket(curr), 1),
      // minimum
      (packet) => Math.min(...packet.subPackets.map(p => this.evaluatePacket(p))),
      // maximum
      (packet) => Math.max(...packet.subPackets.map(p => this.evaluatePacket(p))),
      // literal
      (packet) => packet.value,
      // greater
      (packet) => this.evaluatePacket(packet.subPackets[0]) > this.evaluatePacket(packet.subPackets[1]) ? 1 : 0,
      // less
      (packet) => this.evaluatePacket(packet.subPackets[0]) < this.evaluatePacket(packet.subPackets[1]) ? 1 : 0,
      // equal
      (packet) => this.evaluatePacket(packet.subPackets[0]) == this.evaluatePacket(packet.subPackets[1]) ? 1 : 0,
    ]

    return operators[packet.id](packet);

  }

  readPackage() {
    const version = this.readNumber(3);
    const id = this.readNumber(3);
    if (this.bitStream.atEnd) return null;

    const packet = {
      version, id
    }

    if (id == 4)
      packet.value = this.readLiteralValue()
    else {
      const lenghtTypeId = this.bitStream.take(1)[0]
      packet.subPackets = [];

      const length = lenghtTypeId == 0 ? this.readNumber(15) : this.readNumber(11);

      if (lenghtTypeId == 0) {
        const start = this.bitStream.position;
        while (this.bitStream.position < start + length) {
          packet.subPackets.push(this.readPackage());
        }
      } else {
        for (let index = 0; index < length; index++) {
          packet.subPackets.push(this.readPackage());
        }
      }
      packet.value = this.evaluatePacket(packet);
    }

    return packet;
  }
}

function parse(input) {
  const stream = new BitStream(input);

  const pp = new PacketParser(stream);

  let sum = 0;
  while (!stream.streamEnd) {
    const packet = pp.readPackage();
    if (packet == null) break;
    sum += packet.value;

    console.log(packet);
  }

  return sum;
}



let result = parse(input)
console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */

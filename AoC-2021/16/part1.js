import chalk from 'chalk';
import { read, readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()

// const input = 'A0016C880162017C3686B18A3D4780'


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
      const lenghtTypeId = this.bitStream.take(1)
      const length = lenghtTypeId == 0 ? this.readNumber(15) : this.readNumber(11);

      packet.subPackets = [];
      const start = this.bitStream.position;
      while (this.bitStream.position < start + length) {
        packet.subPackets.push(this.readPackage());
      }

    }


    return packet;
  }
}


function sumVersion(packet) {
  if (packet.subPackets)
    return packet.subPackets.map(sumVersion).reduce((acc, curr) => acc + curr, packet.version);

  return packet.version;
}

function parse(input) {
  const stream = new BitStream(input);

  const pp = new PacketParser(stream);

  let sum = 0;

  while (!stream.streamEnd) {
    const packet = pp.readPackage();
    if (packet == null) break;
    sum += sumVersion(packet);

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

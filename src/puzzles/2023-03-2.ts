import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023031 extends AbstractPuzzle implements Puzzle {
  constructor() {
    super('2023-03-input.txt');
  }

  public async run() {
    let total = 0;
    for (const gear of this.gears) {
      const positions = Array.from(
        this.findAdjacentNumberPositions(gear[0], gear[1]),
      ).map((data) => JSON.parse(data));

      if (positions.length !== 2) {
        continue;
      }

      const cog1 = this.findGridNumber(positions[0][0], positions[0][1]);
      const cog2 = this.findGridNumber(positions[1][0], positions[1][1]);

      if (cog1 && cog2) {
        total += parseInt(cog1, 10) * parseInt(cog2, 10);
      }
    }

    this.output = total.toString();
  }

  private get gears() {
    const positions: Array<[number, number]> = [];
    for (let y = 0; y < this.lines.length; y++) {
      const line = this.lines[y];

      const stars = line.matchAll(/\*/g);
      for (const star of stars) {
        const x = star.index;

        positions.push([x, y]);
      }
    }

    return positions;
  }

  private findAdjacentNumberPositions(x: number, y: number) {
    const adjacentNumbers: Set<string> = new Set();
    for (let j = 0; j < 1; j++) {
      const numberPos = x + j;
      const top = this.findGridNumberPosition(y - 1, numberPos);
      adjacentNumbers.add(JSON.stringify([top?.x, top?.y]));

      const bottom = this.findGridNumberPosition(y + 1, numberPos);
      adjacentNumbers.add(JSON.stringify([bottom?.x, bottom?.y]));

      // left
      if (numberPos === x) {
        const bottom = this.findGridNumberPosition(y + 1, numberPos - 1);
        adjacentNumbers.add(JSON.stringify([bottom?.x, bottom?.y]));

        const top = this.findGridNumberPosition(y - 1, numberPos - 1);
        adjacentNumbers.add(JSON.stringify([top?.x, top?.y]));
      }

      // right
      if (numberPos === x + 1) {
        const bottom = this.findGridNumberPosition(y + 1, numberPos + 1);
        adjacentNumbers.add(JSON.stringify([bottom?.x, bottom?.y]));

        const top = this.findGridNumberPosition(y - 1, numberPos + 1);
        adjacentNumbers.add(JSON.stringify([top?.x, top?.y]));
      }
    }

    return adjacentNumbers;
  }

  private findGridNumber(x: number, y: number) {
    if (typeof y === 'undefined' || typeof x === 'undefined') {
      return;
    }

    const line = this.lines[y];
    const numbers = line?.matchAll(/\d+/g) || [];

    for (const data of numbers) {
      const number = data[0];
      const startIndex = data.index;
      const endIndex = startIndex + number.length;

      if (x === startIndex || x <= endIndex) {
        return number;
      }
    }
  }

  private findGridNumberPosition(linePos: number, charPos: number) {
    if (typeof linePos === 'undefined' || typeof charPos === 'undefined') {
      return;
    }

    const line = this.lines[linePos];
    const numbers = line.matchAll(/\d+/g);

    for (const data of numbers) {
      const number = data[0];
      const startIndex = data.index;
      const endIndex = startIndex + number.length;

      if (charPos === startIndex || charPos <= endIndex) {
        return { x: startIndex, y: linePos };
      }
    }
  }
}

export default Puzzle2023031;

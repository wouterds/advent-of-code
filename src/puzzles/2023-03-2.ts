import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023031 extends AbstractPuzzle implements Puzzle {
  constructor() {
    super('2023-03-input.txt');
  }

  public async run() {
    const cogMap: {
      [pos: string]: {
        number: string;
        x: number;
        y: number;
        valid: boolean;
      };
    } = {};
    const lineTotals: Record<number, number> = {};
    for (let y = 0; y < this.lines.length; y++) {
      const line = this.lines[y];
      const gears = this.gears[y];

      for (const gear of gears) {
        if (!lineTotals[y]) {
          lineTotals[y] = 0;
        }

        const cogs = Array.from(
          this.findAdjacentNumberPositions(gear[0], gear[1]),
        )
          .map((data) => JSON.parse(data))
          .map(([x, y]) => {
            const number = this.findGridNumber(x, y);

            if (number) {
              return [number, { x, y }];
            }
          })
          .filter(Boolean);

        for (const cog of cogs) {
          const [number, { x, y }] = cog;

          cogMap[`${x},${y}`] = {
            number,
            x,
            y,
            valid: cogs.length === 2,
          };
        }

        if (cogs.length === 2) {
          const cog1 = cogs[0][0];
          const cog2 = cogs[1][0];

          lineTotals[y] += cog1 * cog2;
        }
      }
    }

    let total = 0;
    for (let y = 0; y < this.lines.length; y++) {
      const line = this.lines[y];

      for (let x = 0; x < line.length; x++) {
        const char = line[x];
        const cog = cogMap[`${x},${y}`];

        if (cog) {
          process.stdout.write(
            cog.valid ? chalk.green(cog.number) : chalk.red(cog.number),
          );
          x += cog.number.length - 1;
        } else {
          process.stdout.write(chalk.blue(char));
        }
      }

      const lineTotal = lineTotals[y] || 0;
      total += lineTotal;

      console.log(
        ` ${chalk.yellow(total)}${
          lineTotal ? chalk.green(` +${lineTotal}`) : chalk.red(` +0`)
        }`,
      );
    }

    this.output = total.toString();
  }

  private _gears: {
    [line: number]: Array<[number, number]>;
  };
  private get gears() {
    if (this._gears) {
      return this._gears;
    }

    this._gears = {};

    for (let y = 0; y < this.lines.length; y++) {
      const line = this.lines[y];
      if (!this._gears[y]) {
        this._gears[y] = [];
      }

      const stars = line.matchAll(/\*/g);
      for (const star of stars) {
        const x = star.index;

        this._gears[y].push([x, y]);
      }
    }

    return this._gears;
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

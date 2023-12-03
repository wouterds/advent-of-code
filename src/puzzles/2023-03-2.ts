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
      const top = this.findNumber(x, y - 1);
      adjacentNumbers.add(JSON.stringify([top?.x, top?.y]));

      const bottom = this.findNumber(x, y + 1);
      adjacentNumbers.add(JSON.stringify([bottom?.x, bottom?.y]));

      const right = this.findNumber(x + 1, y);
      adjacentNumbers.add(JSON.stringify([right?.x, right?.y]));

      const left = this.findNumber(x - 1, y);
      adjacentNumbers.add(JSON.stringify([left?.x, left?.y]));

      // left bottom corner
      const leftBottom = this.findNumber(x - 1, y + 1);
      adjacentNumbers.add(JSON.stringify([leftBottom?.x, leftBottom?.y]));

      // left top corner
      const leftTop = this.findNumber(x - 1, y - 1);
      adjacentNumbers.add(JSON.stringify([leftTop?.x, leftTop?.y]));

      // right bottom corner
      const rightBottom = this.findNumber(x + 1, y + 1);
      adjacentNumbers.add(JSON.stringify([rightBottom?.x, rightBottom?.y]));

      // right top corner
      const rightTop = this.findNumber(x + 1, y - 1);
      adjacentNumbers.add(JSON.stringify([rightTop?.x, rightTop?.y]));
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
      if (x === data.index && y === y) {
        return data[0];
      }
    }
  }

  private findNumber(x: number, y: number) {
    if (typeof x === 'undefined' || typeof y === 'undefined') {
      return;
    }

    const line = this.lines[y];
    const numbers = line.matchAll(/\d+/g);

    for (const data of numbers) {
      const number = data[0];
      const startIndex = data.index;
      const endIndex = startIndex + number.length;

      if (x >= startIndex && x < endIndex) {
        return { x: startIndex, y };
      }
    }
  }
}

export default Puzzle2023031;

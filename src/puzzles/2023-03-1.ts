import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023031 extends AbstractPuzzle implements Puzzle {
  constructor() {
    super('2023-03-input.txt');
  }

  public async run() {
    let total = 0;
    for (let linePos = 0; linePos < this.lines.length; linePos++) {
      const line = this.lines[linePos];

      for (const data of line.matchAll(/\d+/g)) {
        const number = data[0];
        const startIndex = data.index;
        const endIndex = startIndex + number.length;

        const adjacentChars = [
          this.grid[linePos][startIndex - 1], // left
          this.grid[linePos][endIndex], // right
        ];
        for (let j = 0; j < number.length; j++) {
          const numberPos = startIndex + j;
          adjacentChars.push(this.grid[linePos - 1]?.[numberPos]); // top
          adjacentChars.push(this.grid[linePos + 1]?.[numberPos]); // bottom

          if (numberPos === startIndex) {
            // left bottom corner
            adjacentChars.push(this.grid[linePos + 1]?.[numberPos - 1]);
            // left top corner
            adjacentChars.push(this.grid[linePos - 1]?.[numberPos - 1]);
          }

          if (numberPos === endIndex - 1) {
            // right bottom corner
            adjacentChars.push(this.grid[linePos + 1]?.[numberPos + 1]);
            // right top corner
            adjacentChars.push(this.grid[linePos - 1]?.[numberPos + 1]);
          }

          adjacentChars.splice(
            0,
            adjacentChars.length,
            ...adjacentChars.filter((char) => char !== undefined),
          );
        }

        const valid = this.symbols.some((symbol) => {
          return adjacentChars.includes(symbol);
        });

        console.log(
          `[${chalk.yellow(total)}${
            valid ? chalk.green(`+${number}`) : chalk.red(`+${number}`)
          }] ${chalk.blue(adjacentChars.join(' '))}`,
        );

        if (valid) {
          total += parseInt(number);
        }
      }

      this.output = total.toString();
    }
  }

  private get grid() {
    return this.lines.map((line) => line.split(''));
  }

  private get symbols() {
    const set: Set<string> = new Set();

    for (let symbols of this.lines) {
      symbols = symbols.replace(/\./g, '');
      symbols = symbols.replace(/\d/g, '');

      for (const symbol of symbols.split('')) {
        set.add(symbol);
      }
    }

    return Array.from(set);
  }
}

export default Puzzle2023031;

import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023021 extends AbstractPuzzle implements Puzzle {
  private _bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  constructor() {
    super('2023-02-input.txt');
  }

  public async run() {
    let total = 0;
    for (const line of this.lines) {
      const id = this._parseIdFromLine(line);
      const sets = this._parseSetsFromLine(line);

      let possible = true;
      for (const set of sets) {
        if (
          set.red > this._bag.red ||
          set.green > this._bag.green ||
          set.blue > this._bag.blue
        ) {
          possible = false;
          break;
        }
      }

      process.stdout.write(
        `[${chalk.yellow(total)}${possible ? chalk.green(`+${id}`) : ''}]`,
      );

      for (const set of sets) {
        process.stdout.write(
          ` (${chalk.red(set.red)}${chalk.green(set.green)}${chalk.blue(
            set.blue,
          )})`,
        );
      }
      console.log();

      if (possible) {
        total += id;
      }
    }

    this.output = total.toString();
  }

  private _parseIdFromLine(line: string): number {
    return parseInt(line.split(':')[0].split(' ')[1]);
  }

  private _parseSetsFromLine(
    line: string,
  ): Array<{ red: number; green: number; blue: number }> {
    return line
      .split(':')[1]
      .split(';')
      .reduce((acc, set) => {
        const red = set.match(/(\d+) red/)?.[1] || 0;
        const green = set.match(/(\d+) green/)?.[1] || 0;
        const blue = set.match(/(\d+) blue/)?.[1] || 0;

        return [...acc, { red, green, blue }];
      }, []);
  }
}

export default Puzzle2023021;

import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023022 extends AbstractPuzzle implements Puzzle {
  private constructor() {
    super('2023-02-input.txt');
  }

  public async run() {
    const lines = this.data.split('\n');

    let total = 0;
    for (const line of lines) {
      const sets = this.parseSetsFromLine(line);

      const bag = { red: 0, green: 0, blue: 0 };
      for (const set of sets) {
        bag.red = Math.max(bag.red, set.red);
        bag.green = Math.max(bag.green, set.green);
        bag.blue = Math.max(bag.blue, set.blue);
      }

      const power = bag.red * bag.green * bag.blue;

      process.stdout.write(
        `[${chalk.yellow(total)}${chalk.green(`+${power}`)}]`,
      );
      console.log(
        ` (${chalk.red(bag.red)}${chalk.green(bag.green)}${chalk.blue(
          bag.blue,
        )})`,
      );

      total += power;
    }

    this.output = total.toString();
  }

  private parseIdFromLine(line: string): number {
    return parseInt(line.split(':')[0].split(' ')[1]);
  }

  private parseSetsFromLine(
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

export default Puzzle2023022;

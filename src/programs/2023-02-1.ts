import chalk from 'chalk';

import { AbstractProgram } from '../abstracts/program';
import { IProgram } from '../interfaces/program';

class Program extends AbstractProgram implements IProgram {
  private bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  private constructor() {
    super('2023-02-input.txt');
  }

  public async run() {
    const lines = this.data.split('\n');

    let total = 0;
    for (const line of lines) {
      const id = this.parseIdFromLine(line);
      const sets = this.parseSetsFromLine(line);

      let possible = true;
      for (const set of sets) {
        if (
          set.red > this.bag.red ||
          set.green > this.bag.green ||
          set.blue > this.bag.blue
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

    this.solution = total.toString();
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

export default Program;

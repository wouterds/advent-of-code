import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023011 extends AbstractPuzzle implements Puzzle {
  constructor() {
    super('2023-01-input.txt');
  }

  public async run() {
    let total = 0;
    for (const line of this.lines) {
      process.stdout.write(`[${chalk.yellow(total)}] ${line}`);

      const firstNumber = line.match(/\d/g)?.shift?.() || '';
      const lastNumber = line.match(/\d/g)?.pop?.() || firstNumber;
      const number = `${firstNumber}${lastNumber}`;
      console.log(chalk.green(` ${number}`));

      total += parseInt(number);
    }

    this.output = total.toString();
  }
}

export default Puzzle2023011;

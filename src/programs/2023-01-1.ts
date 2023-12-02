import chalk from 'chalk';

import { AbstractProgram } from '../abstracts/program';
import { IProgram } from '../interfaces/program';

class Program extends AbstractProgram implements IProgram {
  private constructor() {
    super('2023-01-input.txt');
  }

  public async run() {
    const lines = this.data.split('\n');

    let total = 0;
    for (const line of lines) {
      process.stdout.write(`[${chalk.yellow(total)}] ${line}`);

      const firstNumber = line.match(/\d/g)?.shift?.() || '';
      const lastNumber = line.match(/\d/g)?.pop?.() || firstNumber;
      const number = `${firstNumber}${lastNumber}`;
      console.log(chalk.green(` ${number}`));

      total += parseInt(number);
    }

    this.solution = total.toString();
  }
}

export default Program;

import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023012 extends AbstractPuzzle implements Puzzle {
  private constructor() {
    super('2023-01-input.txt');
  }

  private wordNumberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  private findFirstNumber(string: string): number {
    let number = 0;
    let lowestIndex = Infinity;
    for (const word of Object.keys(this.wordNumberMap)) {
      const index = string.indexOf(word);
      if (index === -1) {
        continue;
      }

      if (index < lowestIndex) {
        lowestIndex = index;
        number = this.wordNumberMap[word];
      }
    }

    const decimalNumberMatch = string.match(/\d/g)?.shift?.();
    if (decimalNumberMatch) {
      const index = string.indexOf(decimalNumberMatch);
      if (index < lowestIndex) {
        lowestIndex = index;
        number = parseInt(decimalNumberMatch);
      }
    }

    return number;
  }

  private findLastNumber(string: string): number {
    let number = 0;
    let highestIndex = -1;
    for (const word of Object.keys(this.wordNumberMap)) {
      const indexes = string.matchAll(new RegExp(word, 'g'));
      for (const index of indexes) {
        if (index.index > highestIndex) {
          highestIndex = index.index;
          number = this.wordNumberMap[word];
        }
      }
    }

    const decimalNumberMatch = string.match(/\d/g)?.pop?.();
    if (decimalNumberMatch) {
      const index = string.lastIndexOf(decimalNumberMatch);
      if (index > highestIndex) {
        highestIndex = index;
        number = parseInt(decimalNumberMatch);
      }
    }

    return number;
  }

  public async run() {
    let total = 0;
    for (const line of this.lines) {
      process.stdout.write(`[${chalk.yellow(total)}] ${line}`);

      const firstNumber = this.findFirstNumber(line);
      const lastNumber = this.findLastNumber(line);

      const number = `${firstNumber}${lastNumber}`;
      console.log(chalk.green(` ${number}`));

      total += parseInt(number);
    }

    this.output = total.toString();
  }
}

export default Puzzle2023012;

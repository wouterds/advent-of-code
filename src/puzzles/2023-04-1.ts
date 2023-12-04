import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

type Card = {
  id: number;
  winning: number[];
  given: number[];
};

class Puzzle2023041 extends AbstractPuzzle implements Puzzle {
  constructor() {
    super('2023-04-input.txt');
  }

  public async run() {
    const cards = this.cards;
  }

  private get cards(): Card[] {
    return this.lines.map((line) => {
      const [name, data] = line.split(':');

      const id = parseInt(name.split(' ').pop().trim());

      const numbers = data.split('|');
      const winning = numbers[0]
        .split(' ')
        .filter((n) => !isNaN(parseInt(n)))
        .map((n) => parseInt(n.trim()));
      const given = numbers[1]
        .split(' ')
        .filter((n) => !isNaN(parseInt(n)))
        .map((n) => parseInt(n.trim()));

      return { id, winning, given };
    });
  }
}

export default Puzzle2023041;

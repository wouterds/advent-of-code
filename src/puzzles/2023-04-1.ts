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

    let total = 0;
    for (const card of cards) {
      const score = this.calculateScore(card);

      console.log(`card ${chalk.yellow(card.id)} score: ${chalk.green(score)}`);

      total += score;
    }

    this.output = total.toString();
  }

  private calculateScore(card: Card): number {
    const winning = card.winning;
    const given = card.given;

    let points = 0;
    for (const number of given) {
      if (winning.includes(number)) {
        points += 1;
      }
    }

    let score = points > 0 ? 1 : 0;
    for (let i = 0; i < points - 1; i++) {
      score *= 2;
    }

    return score;
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

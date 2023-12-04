import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

type Card = {
  id: number;
  winning: number[];
  given: number[];
};

class Puzzle2023042 extends AbstractPuzzle implements Puzzle {
  constructor() {
    super('2023-04-input.txt');
  }

  private _points = 0;

  public async run() {
    for (const [id] of Object.entries(this.cards)) {
      this.calculateScore(parseInt(id));
    }

    this.output = this._points.toString();
  }

  private calculateScore(cardId: number) {
    if (!this.cards[cardId]) {
      return;
    }

    this._points += 1;

    const matches = this.findMatches(this.cards[cardId]);
    const cardIds = [];
    for (let i = 1; i <= matches.length; i++) {
      cardIds.push(cardId + i);
    }

    for (const id of cardIds) {
      this.calculateScore(id);
    }
  }

  private findMatches(card: Card): number[] {
    const winning = card.winning;
    const given = card.given;

    const matches = [];
    for (const number of given) {
      if (winning.includes(number)) {
        matches.push(number);
      }
    }

    return matches;
  }

  private _cards: Record<number, Card> = {};
  private get cards() {
    if (Object.keys(this._cards).length) {
      return this._cards;
    }

    const cards = this.lines.map((line) => {
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

    for (const card of cards) {
      this._cards[card.id] = card;
    }

    return this._cards;
  }
}

export default Puzzle2023042;

import chalk from 'chalk';

import { AbstractPuzzle } from '../abstracts/puzzle';
import { Puzzle } from '../interfaces/puzzle';

class Puzzle2023051 extends AbstractPuzzle implements Puzzle {
  constructor() {
    super('2023-05-input.txt');
  }

  public async run() {
    const seeds = this.seeds;
    const seedMaps = this.seedMaps;

    console.log(seeds, seedMaps);
  }

  private get seeds(): Seed[] {
    const line = this.data.match(/seeds: (\d+(?:\s\d+)*)/g);
    return line[0].match(/\d+/g);
  }

  private get seedMaps() {
    const selection = this.data.match(/(.+)map:\s*([\s\S]*?)(?=\n\n|$)/g);

    const maps: SeedMap = {};
    for (const map of selection) {
      const data = map.split(' map:\n');
      const name = data[0];
      const numbers = data[1]
        .split('\n')
        .map((row) => row.split(' ').map((seed) => seed.trim()));

      maps[name] = numbers;
    }

    return maps;
  }
}

type MapKey = string;

type Seed = string;

type SeedMap = {
  [key: MapKey]: Array<Seed[]>;
};

export default Puzzle2023051;

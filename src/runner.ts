import chalk from 'chalk';
import { program as parser } from 'commander';
import fs from 'fs';
import path from 'path';

import { Puzzle } from './interfaces/puzzle';

parser.option('-p, --puzzle <type>', 'Specify a puzzle to run');
parser.parse(process.argv);

const name = parser.opts()?.puzzle;
if (!name) {
  console.log(chalk.red('Missing --puzzle (-p) option'));
  process.exit(1);
}

const pattern = /\d{4}-\d{2}-\d{1}/;
if (!pattern.test(name)) {
  console.log(chalk.red('Please specify a valid puzzle name, e.g.: 2023-01-1'));
  process.exit(1);
}

if (!fs.existsSync(path.resolve(__dirname, `./puzzles/${name}.ts`))) {
  console.log(chalk.red(`Puzzle ${name} does not exist`));
  process.exit(1);
}

(async () => {
  console.log(chalk.yellow(`Running puzzle ${name}...`));

  const start = Date.now();

  const Puzzle = (await import(`./puzzles/${name}`)).default;

  const puzzle: Puzzle = new Puzzle();
  await puzzle.run();

  const end = Date.now();

  console.log(chalk.green(`Solved puzzle ${name} in ${end - start}ms`));
  console.log(chalk.blueBright('Output:', puzzle.output));
})();

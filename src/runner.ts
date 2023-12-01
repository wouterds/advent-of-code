import chalk from 'chalk';
import { program as parser } from 'commander';
import fs from 'fs';
import path from 'path';

parser.option('-p, --program <type>', 'Specify a program');
parser.parse(process.argv);

const programName = parser.opts()?.program;
if (!programName) {
  console.log(chalk.red('Missing --program (-p) option'));
  process.exit(1);
}

const pattern = /\d{4}-\d{2}-\d{1}/;
if (!pattern.test(programName)) {
  console.log(chalk.red('Please specify a valid program, e.g.: -p 2023-01-1'));
  process.exit(1);
}

if (!fs.existsSync(path.resolve(__dirname, `./programs/${programName}.ts`))) {
  console.log(chalk.red(`Program ${programName} does not exist`));
  process.exit(1);
}

(async () => {
  console.log(chalk.yellow(`Running program ${programName}...`));

  const start = Date.now();
  const program = (await import(`./programs/${programName}`)).default;
  const output = await new program().run();
  const end = Date.now();

  console.log(
    chalk.green(`Finished running program ${programName} in ${end - start}ms`),
  );
  console.log(chalk.blueBright('Output:', output));
})();

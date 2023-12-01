import { AbstractProgram } from '../abstracts/program';
import { IProgram } from '../interfaces/program';

class Program extends AbstractProgram implements IProgram {
  private constructor() {
    super('2023-01-1');
  }

  public async run() {
    const lines = this.data.split('\n');

    let total = 0;
    for (const line of lines) {
      const firstNumber = line.match(/\d/g)?.shift?.();
      const lastNumber = line.match(/\d/g)?.pop?.();
      if (!firstNumber) {
        continue;
      }

      const number = parseInt(firstNumber + (lastNumber || firstNumber || ''));

      total += number;

      console.log(`Line: ${line}, number:`, number, 'sub-total:', total);
    }

    this.solution = total.toString();
  }
}

export default Program;

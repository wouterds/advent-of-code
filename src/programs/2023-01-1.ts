import { AbstractProgram } from '../abstracts/program';
import { IProgram } from '../interfaces/program';

class Program extends AbstractProgram implements IProgram {
  private constructor() {
    super('2023-01-1');
  }

  public async run(): Promise<string> {
    return;
  }
}

export default Program;

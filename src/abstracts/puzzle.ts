import fs from 'fs';
import path from 'path';

export abstract class AbstractPuzzle {
  protected path: string;
  protected data: string;
  private _output: string;

  protected constructor(inputDataPath: string) {
    if (!inputDataPath) {
      throw new Error('Missing input data path');
    }

    this.path = inputDataPath;
    this.load();
  }

  protected set output(value: string) {
    this._output = value;
  }

  public get output() {
    return this._output || 'n/a';
  }

  public load() {
    const fullPath = path.resolve(__dirname, `../../data/${this.path}`);
    const data = fs.readFileSync(fullPath);

    this.data = data.toString('utf-8');
  }
}

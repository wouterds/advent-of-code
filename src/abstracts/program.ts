import fs from 'fs';
import path from 'path';

export abstract class AbstractProgram {
  protected path: string;
  protected data: string;
  private _solution: string;

  protected constructor(inputDataPath: string) {
    if (!inputDataPath) {
      throw new Error('Missing input data path');
    }

    this.path = inputDataPath;
    this.load();
  }

  protected set solution(value: string) {
    this._solution = value;
  }

  public get solution() {
    return this._solution || 'n/a';
  }

  public load() {
    const fullPath = path.resolve(__dirname, `../../data/${this.path}`);
    const data = fs.readFileSync(fullPath);

    this.data = data.toString('utf-8');
  }
}

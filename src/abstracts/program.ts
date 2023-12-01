import fs from 'fs';
import path from 'path';

export abstract class AbstractProgram {
  protected name: string;
  protected data: string;
  private _solution: string;

  protected constructor(name: string) {
    this.name = name;

    this.load();
  }

  protected set solution(value: string) {
    this._solution = value;
  }

  public get solution() {
    return this._solution || 'n/a';
  }

  public load() {
    const fullPath = path.resolve(
      __dirname,
      `../../data/${this.name}-input.txt`,
    );
    const data = fs.readFileSync(fullPath);

    this.data = data.toString('utf-8');
  }
}

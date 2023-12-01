import fs from 'fs';
import path from 'path';

export abstract class AbstractProgram {
  protected name: string;
  protected data: string;

  protected constructor(name: string) {
    this.name = name;

    this.load();
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

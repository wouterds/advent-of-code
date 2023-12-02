export interface Puzzle {
  load(): void;
  run(): Promise<void>;
  output: string | undefined;
}

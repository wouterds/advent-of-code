export interface IProgram {
  load(): void;
  run(): Promise<void>;
  solution: string | undefined;
}

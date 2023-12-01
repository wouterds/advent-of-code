type Output = string | undefined;

export interface IProgram {
  load(): void;
  run(): Promise<Output>;
}

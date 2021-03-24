import { Service } from "typedi";

@Service()
export class NestedTest {
  public test = "test";
  public add(a: number, b: number): number {
    return a + b;
  }
}

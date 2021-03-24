import Container, { Service } from "typedi";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";
import { NestedTest } from "./NestedTest.service";
/**
 * Responsible for sending and obtaining results of NER processing.
 * Fetches and emits progress events.
 */
@Service()
export class NerInterfaceService {
  private _onProgress = new SimpleEventDispatcher<number>();
  get onProgress(): ISimpleEvent<number> {
    return this._onProgress.asEvent();
  }

  static get(): NerInterfaceService {
    return Container.get(NerInterfaceService);
  }

  constructor(public nestedTestService: NestedTest) {
    /*   const worker = new Worker(
      new URL(
        "../../IndirectRelatationStructure/Workers/IRS.worker.ts",
        import.meta.url
      )
    );
    worker.postMessage({
      question:
        "The Answer to the Ultimate Question of Life, The Universe, and Everything.",
    });
    worker.onmessage = ({ data: { answer } }) => {
      console.log(answer);
    }; */
  }

  public multiplyAdd(a: number, b: number, c: number): number {
    return a * this.nestedTestService.add(b, c);
  }
}

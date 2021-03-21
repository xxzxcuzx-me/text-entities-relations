import { Service } from "typedi";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";
import workerpool from "workerpool";
/**
 * Responsible for sending and obtaining results of NER processing.
 * Fetches and emits progress events.
 *
 * Should this be a root service alongside with other services?
 * Or maybe this service should be injected and obtained from general class like Ter{}
 */
@Service()
export class NerInterfaceService {
  private _onProgress = new SimpleEventDispatcher<number>();
  get onProgress(): ISimpleEvent<number> {
    return this._onProgress.asEvent();
  }

  constructor() {
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

    const pool = workerpool.pool();

    function add(a, b) {
      return a + b;
    }

    pool
      .exec(add, [3, 4])
      .then(function (result) {
        console.log("result", result); // outputs 7
      })
      .catch(function (err) {
        console.error(err);
      })
      .then(function () {
        pool.terminate(); // terminate all workers when done
      });
  }
}

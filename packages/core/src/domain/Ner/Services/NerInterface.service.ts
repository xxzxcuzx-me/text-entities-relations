import { Service } from "typedi";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";

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
    //
  }
}

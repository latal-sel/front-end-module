import type { Criticity } from "./criticity";
import type { Origin } from "./origin";
import type { State } from "./state";

export class Event {
    timestamp: string;
    message: string;
    origin: Origin;
    eventType: EventType;
    state: State;
    criticity: Criticity;
}
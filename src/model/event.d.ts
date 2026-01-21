import type { EventType } from "./event-type";
import type { Origin } from "./origin";
import type { State } from "./state";

export class Event {
    timestamp: string;
    message: string;
    origin: Origin;
    eventType: EventType;
    state: State;
    criticity: string;
}
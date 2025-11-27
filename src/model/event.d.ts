import type { EventType } from "./event-type";
import type { Origin } from "./origin";
import type { State } from "./state";

export class Event {
    timestamp: Date;
    origin: Origin;
    message: string;
    eventType: EventType;
    state: State;
}
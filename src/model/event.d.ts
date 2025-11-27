import type { EventType } from "./event-type";
import type { Origin } from "./origin";
import type { State } from "./state";

export interface Event {
    timestamp: Date;
    origin: Origin;
    message: string;
    eventType: EventType;
    state: State;
}
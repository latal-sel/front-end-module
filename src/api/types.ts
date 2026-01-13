import type { EventType } from "../model/event-type";
import { api } from "./http";

export const fetchEventTypes = async (): Promise<EventType[]> => {
    const eventTypes = (await api.get<EventType[]>("/event-type")).data;
    eventTypes.forEach(eventType => {
        eventType.name = eventType.name
    });
    return eventTypes;
}  
import type { Event } from "../model/event";
import { api } from "./http";

export const fetchEvents = async (): Promise<Event[]> => {
    const events = (await api.get<Event[]>("/history")).data;
    events.forEach(event => {
        event.timestamp = event.timestamp.replace("T", " ").substring(0, 19);
    });
    return events;
}
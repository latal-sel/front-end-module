import type { Event } from "../model/event";
import { api } from "./http";
import paths from '../utils/paths.json';

export const fetchEvents = async (): Promise<Event[]> => {
    const events = (await api.get<Event[]>("/history")).data;
    events.forEach(event => {
        event.timestamp = event.timestamp.replace("T", " ").substring(0, 19);
        const pathMatch = event.message.match(/\[([^\]]+)\]/);
        if (pathMatch) {
            const pathKey = pathMatch[1];
            const pathName = paths[pathKey as keyof typeof paths]?.[0];
            if (pathName) {
                event.message = event.message.replace(`[${pathKey}]`, pathName);
            }
        }
    });
    return events;
}
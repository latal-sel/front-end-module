import type { EventType } from "../model/event-type";
import { api } from "./http";

export const fetchEventTypes = async (): Promise<EventType[]> => {
    return (await api.get<EventType[]>("/event-type")).data;
}  
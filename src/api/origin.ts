import type { Origin } from "../model/origin";
import { api } from "./http";

export const fetchOrigins = async (): Promise<Origin[]> => {
    const origins = (await api.get<Origin[]>("/origin")).data;
    origins.forEach(origin => {
        origin.name = origin.name
    }
    );
    return origins;
}
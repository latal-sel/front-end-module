import type { Origin } from "../model/origin";
import { api } from "./http";

export const fetchOrigins = async (): Promise<Origin[]> => {
    return (await api.get<Origin[]>("/origin")).data;
}
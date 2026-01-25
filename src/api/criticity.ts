import type { Criticity } from "../model/criticity";
import { api } from "./http";

export const fetchCriticities = async (): Promise<Criticity[]> => {
    return (await api.get<Criticity[]>("/criticity")).data;
}  
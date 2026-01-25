import type { State } from "../model/state";
import { api } from "./http";

export const fetchStates = async (): Promise<State[]> => {
    return (await api.get<State[]>("/state")).data;
}
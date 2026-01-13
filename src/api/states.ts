import type { State } from "../model/state";
import { api } from "./http";

export const fetchStates = async (): Promise<State[]> => {
    const states = (await api.get<State[]>("/state")).data;
    states.forEach(state => {
        state.name = state.name
    }
    );
    return states;
}
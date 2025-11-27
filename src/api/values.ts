import type { Value } from "../model/value";
import { api } from "./http";

export const fetchValues = async (): Promise<Value[]> => {
    return (await api.get<Value[]>("/values")).data;
}
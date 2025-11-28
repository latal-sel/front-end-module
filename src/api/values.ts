import type { Value } from "../model/value";
import { api } from "./http";

export const fetchValues = async (): Promise<Value[]> => {
    return api.get<Value[]>("/values").then(response => response.data);
}
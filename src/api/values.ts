import { api } from "./http";

export type Value = {
    id: number;
    name: string;
    description: string;
};

export const fetchValues = async (): Promise<Value[]> => {
    console.log("Fetching values from API...");
    const response = await api.get<Value[]>("/values");
    console.log(response.data)
    return response.data;
}
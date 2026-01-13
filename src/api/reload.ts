import { api } from "./http";

export const reloadSystem = async (): Promise<void> => {
    await api.post("/reload");
}

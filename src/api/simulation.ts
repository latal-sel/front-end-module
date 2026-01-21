import type { SimulationOrder } from "../model/simulation-order";
import { api } from "./http";

export const sendSimulationData = async (data: SimulationOrder): Promise<void> => {
    await api.post("/simulation", data);
}

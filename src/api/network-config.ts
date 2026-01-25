import type { AllNetworkConfig } from "../model/all-network-config";
import { api } from "./http";

export const fetchNetworkConfig = async (): Promise<AllNetworkConfig> => {
    const response = await api.get<AllNetworkConfig>("/network-config");
    return response.data;
}

export const applyNetworkConfig = async (config: AllNetworkConfig): Promise<void> => {
    await api.post("/network-config", config);
}
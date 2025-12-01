import type { AllNetworkConfig } from "../model/all-network-config";
import { api } from "./http";

export const fetchNetworkConfig = async (): Promise<AllNetworkConfig> => {
    const response = await api.get<AllNetworkConfig>("/network-config");
    console.log("Response data:", response.data);
    return response.data;
}

export const applyNetworkConfig = async (config: AllNetworkConfig): Promise<void> => {
    console.log("Applying network config:", config);
    await api.post("/network-config", config);
}
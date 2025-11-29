import type { AllNetworkConfig } from "../model/all-network-config";
import { api } from "./http";

export const applyNetworkConfig = async (config: AllNetworkConfig): Promise<void> => {
    console.log("Applying network config:", config);
    await api.post("/network-config", config);
}

import React, { useEffect } from "react";
import cross from "../assets/cross.svg";
import type { AllNetworkConfig } from "../model/all-network-config";

import "../styles/component/network-config.css"
import { applyNetworkConfig, fetchNetworkConfig } from "../api/network-config";


interface networkConfigProps { 
    onConfigClick?: () => void;
}

export default function NetworkConfigComponent({ onConfigClick }: networkConfigProps) {
    const [allNetworkConfig, setAllNetworkConfig] = React.useState<AllNetworkConfig>({
        m1: { ipAddress: "", port: "", gateway: "" },
        m3: { ipAddress: "", port: "", gateway: "" },
    });

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchNetworkConfig();
            setAllNetworkConfig(config);
        };
        loadConfig();
        
    }, []);

    function handleInputChange(machine: "m1" | "m3", field: "ipAddress" | "port" | "gateway", value: string) {
        setAllNetworkConfig(prevState => ({
            ...prevState,
            [machine]: {
                ...prevState[machine],
                [field]: value
            }
        }));
    }

    function handleSubmit() {
        applyNetworkConfig(allNetworkConfig)
    }

    return (
        <div className="w-11/12 sm:w-10/12 lg:w-9/12 xl:w-8/12 max-h-[90vh] overflow-y-auto fixed bg-white border border-gray-300 rounded-md p-4 sm:p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-50">
            <div>
                <div className="network-config-title">
                    <h2 className="text-base sm:text-lg lg:text-xl font-semibold">Configuration réseau</h2>
                    <img className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" src={cross} onClick={onConfigClick} alt="Close" />
                </div>
                <div className="network-config-content">
                    <div className="network-config-item">
                        <label className="text-sm sm:text-base lg:text-lg font-medium mb-2">Configuration IP M1</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm lg:text-base">Adresse IP</span>
                            <input type="text" value={allNetworkConfig.m1.ipAddress} placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m1", "ipAddress", event.currentTarget.value)}} className="text-xs sm:text-sm lg:text-base"/>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm lg:text-base">Port</span>
                            <input type="text" value={allNetworkConfig.m1.port} placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m1", "port", event.currentTarget.value)}} className="text-xs sm:text-sm lg:text-base"/>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm lg:text-base">Passerelle</span>
                            <input type="text" value={allNetworkConfig.m1.gateway} placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m1", "gateway", event.currentTarget.value)}} className="text-xs sm:text-sm lg:text-base"/>
                        </div>
                    </div>
                    <div className="network-config-item">
                        <label className="text-sm sm:text-base lg:text-lg font-medium mb-2">Configuration IP M3</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm lg:text-base">Adresse IP</span>
                            <input type="text" value={allNetworkConfig.m3.ipAddress} placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m3", "ipAddress", event.currentTarget.value)}} className="text-xs sm:text-sm lg:text-base"/>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm lg:text-base">Port</span>
                            <input type="text" value={allNetworkConfig.m3.port} placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m3", "port", event.currentTarget.value)}} className="text-xs sm:text-sm lg:text-base"/>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm lg:text-base">Passerelle</span>
                            <input type="text" value={allNetworkConfig.m3.gateway} placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m3", "gateway", event.currentTarget.value)}} className="text-xs sm:text-sm lg:text-base"/>
                        </div>
                    </div>
                </div>
                <div className="network-config-button">
                    <button onClick={handleSubmit} className="text-sm sm:text-base">Appliquer</button>
                </div>
            </div>
        </div>
    );
}
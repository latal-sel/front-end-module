
import React from "react";
import cross from "../assets/cross.svg";
import type { AllNetworkConfig } from "../model/all-network-config";

import "../styles/component/network-config.css"
import { applyNetworkConfig } from "../api/network-config";


interface networkConfigProps { 
    onConfigClick?: () => void;
}



export default function NetworkConfigComponent({ onConfigClick }: networkConfigProps) {
    const [allNetworkConfig, setAllNetworkConfig] = React.useState<AllNetworkConfig>({
        m1: { ipAddress: "", port: "", gateway: "" },
        m3: { ipAddress: "", port: "", gateway: "" },
        automate: { ipAddress: "", port: "", gateway: ""}
    });

    function handleInputChange(machine: "m1" | "m3" | "automate", field: "ipAddress" | "port" | "gateway", value: string) {
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
        <div className="network-config">
            <div>
                <div className="network-config-title">
                    <h2>Configuration réseau</h2>
                    <img src={cross} onClick={onConfigClick} alt="Close" />
                </div>
                <div className="network-config-content">
                    <div className="network-config-item">
                        <label>Configuration IP M1</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type={allNetworkConfig.m1.ipAddress} placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m1", "ipAddress", event.currentTarget.value)}}/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m1", "port", event.currentTarget.value)}}/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m1", "gateway", event.currentTarget.value)}}/>
                        </div>
                    </div>
                    <div className="network-config-item">
                        <label>Configuration IP M3</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m3", "ipAddress", event.currentTarget.value)}}/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m3", "port", event.currentTarget.value)}}/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("m3", "gateway", event.currentTarget.value)}}/>
                        </div>
                    </div>
                    <div className="network-config-item">
                        <label>Configuration IP Automate</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("automate", "ipAddress", event.currentTarget.value)}}/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("automate", "port", event.currentTarget.value)}}/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="Ecrire ici..." onChange={(event) => {handleInputChange("automate", "gateway", event.currentTarget.value)}}/>
                        </div>
                    </div>
                </div>
                <div className="network-config-button">
                    <button onClick={handleSubmit}>Appliquer</button>
                </div>
            </div>
        </div>
    );
}

import cross from "../assets/cross.svg";

import "../styles/component/network-config.css"

interface networkConfigProps { 
    onConfigClick?: () => void;
}

export default function networkConfigComponent({ onConfigClick }: networkConfigProps) {
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
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                    </div>
                    <div className="network-config-item">
                        <label>Configuration IP M3</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                    </div>
                    <div className="network-config-item">
                        <label>Configuration IP Automate</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="Ecrire ici..."/>
                        </div>
                    </div>
                </div>
                <div className="network-config-button">
                    <button>Appliquer</button>
                </div>
            </div>
        </div>
    );
}
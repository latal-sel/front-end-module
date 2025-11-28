
import cross from "../assets/cross.svg";

import "../styles/component/network-config.css"


export default function networkConfigComponent() {
    return (
        <div className="network-config">
            <div>
                <div className="network-config-title">
                    <h2>Configuration réseau</h2>
                    <img src={cross} alt="" />
                </div>
                <div className="network-config-content">
                    <div className="network-config-item">
                        <label>Configuration IP M1</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                    </div>
                    <div className="network-config-item">
                        <label>Configuration IP M3</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                    </div>
                    <div className="network-config-item">
                        <label>Configuration IP Automate</label>
                        <div>
                            <span>Adresse IP</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                        <div>
                            <span>Port</span>
                            <input type="text" placeholder="hey"/>
                        </div>
                        <div>
                            <span>Passerelle</span>
                            <input type="text" placeholder="hey"/>
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
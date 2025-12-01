import { Origin } from "../model/origin"
import type { Value } from "../model/value"


import warningIcon from "../assets/warning.svg";
import disconnectedIcon from "../assets/disconnect.svg";

import "../styles/component/banner.css"

const value: Value = {
        timestamp: new Date(),
        origin: Origin.IHM,
        name: "Temperature",
        value: 22.5,
        unit: "°C",
        isSimulated: false
    }

function getBackgroundColor(type: string): string {
    switch(type) {
        case "default":
            return "whitesmoke";
        case "disconnected":
            return "red";
        case "warning":
            return "gold";
    }
    return "whitesmoke";
}

function getIconPath(type: string): string {
    switch(type) {
        case "disconnected":
            return disconnectedIcon;
        case "warning":
            return warningIcon;
    }
    return "";
}




export default function BannerComponent({type = "default"}: {value: Value, type?: "default" | "disconnected" | "warning"}) {
    return (
        <div className="banner" style={{backgroundColor: getBackgroundColor(type)}}>
            <div className="banner-name">
                {value.name}
            </div>
            {getIconPath(type) && 
                <img src={getIconPath(type)} alt={type} className="icon-image"/>
            }
            <div className="banner-value">
                {value.value}
            </div>
            <div className="banner-unit">
                {value.unit}
            </div>
            <div className="banner-simulation">
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}
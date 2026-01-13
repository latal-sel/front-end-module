import { useEffect, useState } from "react";
import type { Value } from "../model/value"

import warningIcon from "../assets/warning.svg";
import disconnectedIcon from "../assets/disconnect.svg";

import "../styles/component/banner.css"

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

export default function BannerComponent({value, isEnabled = true}: {value: Value, isEnabled?: boolean}) {
    const [isChecked, setIsChecked] = useState(isEnabled);

    useEffect(() => {
        setIsChecked(isEnabled);
    }, [isEnabled]);

    return (
        <div className="banner" style={{backgroundColor: getBackgroundColor(value.type)}}>
            <div className="banner-name">
                {value.name}
            </div>
            {getIconPath(value.type) && 
                <img src={getIconPath(value.type)} alt={value.type} className="icon-image"/>
            }
            <div className="banner-value">
                {isChecked && isEnabled ? <input type="text" className="border border-solid border-black text-right" defaultValue={value.value}/> : value.value}
            </div>
            <div className="banner-unit">
                {value.unit}
            </div>
            <div className="banner-simulation">
                <label className={`switch ${!isEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        disabled={!isEnabled}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}
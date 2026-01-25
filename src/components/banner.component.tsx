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

export default function BannerComponent({value, isEnabled = true, onValueChange, onSimulateChange}: {value: Value, isEnabled?: boolean, onValueChange?: (newValue: string) => void, onSimulateChange?: (shouldSimulate: boolean) => void}) {
    const [isChecked, setIsChecked] = useState(isEnabled);

    useEffect(() => {
        setIsChecked(isEnabled);
    }, [isEnabled]);

    return (
        <div className="banner mt-1" style={{backgroundColor: getBackgroundColor(value.type)}}>
            <div className="banner-name font-semibold text-lg">
                {value.displayName}
            </div>
            {getIconPath(value.type) && 
                <img src={getIconPath(value.type)} alt={value.type} className="icon-image"/>
            }
            <div className="banner-value font-mono text-xl">
                {isChecked && isEnabled ? (
                    <input 
                        type="number" 
                        className="border border-solid border-black text-right" 
                        defaultValue={value.val}
                        onChange={(e) => onValueChange?.(e.target.value)}
                        onBlur={(e) => onValueChange?.(e.target.value)}
                    />
                ) : value.val}
            </div>
            <div className="banner-unit text-sm font-normal">
                {value.unit}
            </div>
            <div className="banner-simulation">
                <label className={`switch ${!isEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                            setIsChecked(e.target.checked);
                            onSimulateChange?.(e.target.checked);
                        }}
                        disabled={!isEnabled}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}
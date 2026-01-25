import React, { useState, useEffect } from "react";
import BannerComponent from "./banner.component";
import { Value } from "../model/value.d";

interface BannerManagerProps {
    title: string;
    values: Value[];
    isChecked: boolean;
    onToggle: () => void;
    onStateChange?: (modifiedValues: Record<string, string>, toSimulate: Record<string, boolean>) => void;
}

const BannerManager: React.FC<BannerManagerProps> = ({
    title,
    values,
    isChecked,
    onToggle,
    onStateChange
}) => {
    const [modifiedValues, setModifiedValues] = useState<Record<string, string>>({});
    const [toSimulate, setToSimulate] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const newModifiedValues: Record<string, string> = {};
        values.forEach(value => {
            if (!(value.iec in modifiedValues) && value.val !== undefined) {
                newModifiedValues[value.iec] = value.val!;
            }
        });
        if (Object.keys(newModifiedValues).length > 0) {
            setModifiedValues(prev => ({ ...prev, ...newModifiedValues }));
        }
    }, [values]);

    useEffect(() => {
        if (onStateChange) {
            onStateChange(modifiedValues, toSimulate);
        }
    }, [modifiedValues, toSimulate]);

    const handleValueChange = (valueName: string, newValue: string) => {
        setModifiedValues(prev => ({
            ...prev,
            [valueName]: newValue
        }));
    };

    const handleSimulateChange = (valueName: string, shouldSimulate: boolean) => {
        setToSimulate(prev => ({
            ...prev,
            [valueName]: shouldSimulate
        }));
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="inline-flex items-center space-x-3 mb-2">
                <span className="font-semibold text-base sm:text-lg">
                    {title}
                </span>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={onToggle}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            {values.length === 0 && (
                <span className="text-gray-500 mt-4">
                    Aucune valeur reçue du module {title.split(' ')[1]}.
                </span>
            )}
            {values.map((value, index) => (
                <BannerComponent
                    key={index}
                    value={value}
                    isEnabled={isChecked}
                    onValueChange={(newValue) => handleValueChange(value.iec, newValue)}
                    onSimulateChange={(shouldSimulate) => handleSimulateChange(value.iec, shouldSimulate)}
                />
            ))}
        </div>
    );
};

export default BannerManager;

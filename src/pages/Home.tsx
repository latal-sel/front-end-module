import React, { use, useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";

import { Value } from "../model/value.d";
import { SimulationOrder } from "../model/simulation-order.d";
import { sendSimulationData } from "../api/simulation";

import { websocketClient } from "../utils/websocket";

const Home: React.FC = () => {
    const [valuesM1, setValuesM1] = useState<Value[]>([]);
    const [valuesM3, setValuesM3] = useState<Value[]>([]);
    const [isCheckedM1, setIsCheckedM1] = useState<boolean>(true);
    const [isCheckedM3, setIsCheckedM3] = useState<boolean>(true);
    const [modifiedValuesM1, setModifiedValuesM1] = useState<Record<string, string>>({});
    const [modifiedValuesM3, setModifiedValuesM3] = useState<Record<string, string>>({});

    const insertValueIntoArray = (
        ValueToInsert: Value,
        ValueArray: Value[],
        setValues: React.Dispatch<React.SetStateAction<Value[]>>
    ) => {
        const index = ValueArray.findIndex(
            (v) => v.name === ValueToInsert.name
        );
        console.log("Index found: ", index);
        console.log("Value to insert: ", ValueToInsert);
        console.log("Current array: ", ValueArray);
        if (index !== -1) {
            const newArray = [...ValueArray];
            newArray[index] = ValueToInsert;
            setValues(newArray);
        } else {
            setValues((prevValues) => [...prevValues, ValueToInsert]);
        }
    };

    useEffect(() => {
        console.log("Setting up WebSocket connection");
        websocketClient.connect();

        websocketClient.on((data: Value) => {
            if (data.datatype != "variable_change") return;
            data.isSimulated = false;
            if (data.module === "M1")
                insertValueIntoArray(data, valuesM1, setValuesM1);
            else if (data.module === "M3") {
                insertValueIntoArray(data, valuesM3, setValuesM3);
            }
        });
    }, [valuesM1, valuesM3]);

    const handleValueChangeM1 = (valueName: string, newValue: string) => {
        console.log("Value changed M1:", valueName, newValue);
        setModifiedValuesM1(prev => ({
            ...prev,
            [valueName]: newValue
        }));
    };

    const handleValueChangeM3 = (valueName: string, newValue: string) => {
        console.log("Value changed M3:", valueName, newValue);
        setModifiedValuesM3(prev => ({
            ...prev,
            [valueName]: newValue
        }));
    };

    const handleSubmit = () => {
        console.log("Valeurs modifiées M1:", modifiedValuesM1);
        console.log("Valeurs modifiées M3:", modifiedValuesM3);

        const simulationOrders: SimulationOrder[] = [];

        Object.entries(modifiedValuesM1).forEach(([name, value]) => {
            simulationOrders.push({
                to_simulate: true,
                iec_path: name,
                value: Number(value)
            });
        });

        Object.entries(modifiedValuesM3).forEach(([name, value]) => {
            simulationOrders.push({
                to_simulate: true,
                iec_path: name,
                value: Number(value)
            });
        });

        simulationOrders.forEach(async (order) => {
            try {
                await sendSimulationData(order);
                console.log(`Simulation data sent for ${order.iec_path}`);
            } catch (error) {
                console.error(`Failed to send simulation data for ${order.iec_path}:`, error);
            }
        });
    };

    return (
        <>
            <Header />
            <div className="flex pt-4 w-1/1 flex-row space-x-4 px-4">
                <div className="w-1/2 flex flex-col items-center">
                    <div className="inline-flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-lg">
                            Valeurs M1
                        </span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isCheckedM1}
                                onChange={() => setIsCheckedM1(!isCheckedM1)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    {valuesM1.length === 0 && (
                        <span className="text-gray-500 mt-4">
                            Aucune valeur reçue du module M1.
                        </span>
                    )}
                    {valuesM1.map((value, index) => (
                        <BannerComponent
                            key={index}
                            value={value}
                            isEnabled={isCheckedM1}
                            onValueChange={(newValue) => handleValueChangeM1(value.name, newValue)}
                        />
                    ))}
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <div className="inline-flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-lg">
                            Valeurs M3
                        </span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isCheckedM3}
                                onChange={() => setIsCheckedM3(!isCheckedM3)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    {valuesM3.length === 0 && (
                        <span className="text-gray-500 mt-4">
                            Aucune valeur reçue du module M3.
                        </span>
                    )}
                    {valuesM3.map((value, index) => (
                        <BannerComponent
                            key={index}
                            value={value}
                            isEnabled={isCheckedM3}
                            onValueChange={(newValue) => handleValueChangeM3(value.name, newValue)}
                        />
                    ))}
                </div>
            </div>
            { (isCheckedM1 || isCheckedM3) && <button onClick={handleSubmit} className="fixed bottom-8 right-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Envoyer
            </button>}
        </>
    );
};

export default Home;

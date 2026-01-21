import React, { useEffect, useState } from "react";

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
    const [toSimulateM1, setToSimulateM1] = useState<Record<string, boolean>>({});
    const [toSimulateM3, setToSimulateM3] = useState<Record<string, boolean>>({});

    const insertValueIntoArray = (
        ValueToInsert: Value,
        ValueArray: Value[],
        setValues: React.Dispatch<React.SetStateAction<Value[]>>
    ) => {
        const index = ValueArray.findIndex(
            (v) => v.name === ValueToInsert.name
        );
      
        if (index !== -1) {
            const newArray = [...ValueArray];
            newArray[index] = ValueToInsert;
            setValues(newArray);
        } else {
            setValues((prevValues) => [...prevValues, ValueToInsert]);
        }
    };

    useEffect(() => {
        websocketClient.connect();

        websocketClient.on("ihm_log", (data: Value) => {
            data.isSimulated = false;
            if (data.origin === 0)
                insertValueIntoArray(data, valuesM1, setValuesM1);
            else if (data.origin != 0) {
                insertValueIntoArray(data, valuesM3, setValuesM3);
                setModifiedValuesM3(prev => ({
                    ...prev,
                    [data.name]: data.value.toString()
                })
                );
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

    const handleSimulateChangeM1 = (valueName: string, shouldSimulate: boolean) => {
        console.log("Simulate changed M1:", valueName, shouldSimulate);
        setToSimulateM1(prev => ({
            ...prev,
            [valueName]: shouldSimulate
        }));
    };

    const handleSimulateChangeM3 = (valueName: string, shouldSimulate: boolean) => {
        console.log("Simulate changed M3:", valueName, shouldSimulate);
        setToSimulateM3(prev => ({
            ...prev,
            [valueName]: shouldSimulate
        }));
    };

    const handleSubmit = () => {
        console.log("Valeurs M1:", valuesM1);
        console.log("Valeurs M3:", valuesM3);
        console.log("To simulate M1:", toSimulateM1);
        console.log("To simulate M3:", toSimulateM3);

        const simulationOrders: SimulationOrder[] = [];

        valuesM1.forEach(value => {
            const currentValue = modifiedValuesM1[value.name] !== undefined 
                ? Number(modifiedValuesM1[value.name]) 
                : Number(value.value);
            const shouldSimulate = toSimulateM1[value.name] !== undefined 
                ? toSimulateM1[value.name] 
                : isCheckedM1;
            
            simulationOrders.push({
                to_simulate: shouldSimulate,
                iec_path: value.name,
                value: currentValue
            });
        });

        valuesM3.forEach(value => {
            const currentValue = modifiedValuesM3[value.name] !== undefined 
                ? Number(modifiedValuesM3[value.name]) 
                : Number(value.value);
            const shouldSimulate = toSimulateM3[value.name] !== undefined 
                ? toSimulateM3[value.name] 
                : isCheckedM3;
            
            simulationOrders.push({
                to_simulate: shouldSimulate,
                iec_path: value.name,
                value: currentValue
            });
        });

        simulationOrders.forEach(async (order) => {
            try {
                await sendSimulationData(order);
                console.log(`Simulation data sent for ${order.iec_path} with to_simulate: ${order.to_simulate}`);
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
                            onSimulateChange={(shouldSimulate) => handleSimulateChangeM1(value.name, shouldSimulate)}
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
                            onSimulateChange={(shouldSimulate) => handleSimulateChangeM3(value.name, shouldSimulate)}
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

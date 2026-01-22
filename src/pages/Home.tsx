import React, { useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";

import { Value } from "../model/value.d";
import { SimulationOrder } from "../model/simulation-order.d";
import { sendSimulationData } from "../api/simulation";
import { Event } from "../model/event.d";
import paths from '../utils/paths.json';

import { websocketClient } from "../utils/websocket";

const Home: React.FC = () => {
    const [valuesM1, setValuesM1] = useState<Value[]>([]);
    const [valuesM3, setValuesM3] = useState<Value[]>([]);
    const [isCheckedM1, setIsCheckedM1] = useState<boolean>(false);
    const [isCheckedM3, setIsCheckedM3] = useState<boolean>(false);
    const [modifiedValuesM1, setModifiedValuesM1] = useState<Record<string, string>>({});
    const [modifiedValuesM3, setModifiedValuesM3] = useState<Record<string, string>>({});
    const [toSimulateM1, setToSimulateM1] = useState<Record<string, boolean>>({});
    const [toSimulateM3, setToSimulateM3] = useState<Record<string, boolean>>({});
    const [events, setEvents] = useState<Event[]>([]);

    const processReceivedData = (rawDataList: any[]) => {
        const newM1: Value[] = [];
        const newM3: Value[] = [];
        const newM3Modified: Record<string, string> = {};
        const pathTyped: any = paths;

        rawDataList.forEach((item) => {
            const val: Value = {
                name: item.iec,
                value: item.val === "" ? 0 : Number(item.val),
                unit: item.unit,
                isSimulated: item.sim,
                type: "",
                module: "",
                displayName: ""
            };

            if (val.name in pathTyped) {
                val.module = (paths as any)[val.name][1];
                val.displayName = (paths as any)[val.name][0];

                if (val.module === "M1") {
                    newM1.push(val);
                } else if (val.module === "M3") {
                    newM3.push(val);
                    newM3Modified[val.name] = val.value.toString();
                }
            }
        });

        setValuesM1(newM1);
        setValuesM3(newM3);
        setModifiedValuesM3((prev) => ({ ...prev, ...newM3Modified }));
    };

    useEffect(() => {
        websocketClient.connect();

        websocketClient.onValue("iec_get_all_values_response", (response: any) => {
            if (response.status === 'ok' && Array.isArray(response.data)) {
                processReceivedData(response.data);
            }
        });

        setTimeout(() => {
             websocketClient.emit("iec_order", { cmd: "GET_ALL_VALUES" }); 
        }, 500);
        return () => {
        };
    }, []);

    const insertValueIntoArray = (
        valueToInsert: Value,
        setValues: React.Dispatch<React.SetStateAction<Value[]>>
    ) => {
        setValues((prevValues) => {
            const index = prevValues.findIndex((v) => v.name === valueToInsert.name);
            if (index !== -1) {
                const newArray = [...prevValues];
                newArray[index] = valueToInsert;
                return newArray;
            }
            return [...prevValues, valueToInsert];
        });
    };

    useEffect(() => {
        websocketClient.onValue("ihm_log", (data: Value) => {
            if (data instanceof Event) return;
            if (!(data.name in paths)) return;
            data.module = paths[data.name as keyof typeof paths][1];
            data.displayName = paths[data.name as keyof typeof paths][0];
            
            if (data.module === "M1")
                insertValueIntoArray(data, setValuesM1);
            else if (data.module === "M3") {
                insertValueIntoArray(data, setValuesM3);
                setModifiedValuesM3(prev => ({
                    ...prev,
                    [data.name]: data.value.toString()
                }));
            }
        });
    }, []);

    useEffect(() => {
                websocketClient.onValue("iec-get-all-values-response", (data: Value) => {
                const valuesArray: Value[] = (data as unknown as any).data.map((item: any) => {
                const value: Value = {
                    name: item.iec,
                    value: item.val === "" ? 0 : Number(item.val),
                    unit: item.unit,
                    isSimulated: item.sim,
                    type: "",
                    module: "",
                    displayName: ""
                };
                if (value.name in paths) {
                    value.module = paths[value.name as keyof typeof paths][1];
                    value.displayName = paths[value.name as keyof typeof paths][0];
                }
                return value;
            });

            valuesArray.forEach((value) => {
                if (value.module === "M1")
                    insertValueIntoArray(value, setValuesM1);
                else if (value.module === "M3") {
                    insertValueIntoArray(value, setValuesM3);
                    setModifiedValuesM3(prev => ({
                        ...prev,
                        [value.name]: value.value.toString()
                    }));
                }
            });
        });
    }, []);

    useEffect(() => {
        websocketClient.onEvent("ihm_event", (data: Event) => {
            setEvents((prevEvents) => [...prevEvents, data]);
        });
    }, [events]);

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
            <table className="border-collapse border border-gray-500 w-9/10 mt-3 text-center justify-center mx-auto">
                <thead className="bg-blue-300"> 
                    <tr>
                        <th className="border border-gray-300 px-4 py-1">Timestamp</th>
                        <th className="border border-gray-300 px-4 py-1">Origine</th>
                        <th className="border border-gray-300 px-4 py-1">Message</th>
                        <th className="border border-gray-300 px-4 py-1">Criticité</th>
                    </tr>
                </thead>
                <tbody>
                    {events.slice(-3).reverse().map((event, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                            <td className="border border-gray-300 px-4 py-2">{new Date(event.timestamp).toLocaleString()}</td>
                            <td className="border border-gray-300 px-4 py-2">{event.origin.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{event.message}</td>
                            <td className="border border-gray-300 px-4 py-2">{event.criticity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;

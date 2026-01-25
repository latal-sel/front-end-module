import React, { useEffect, useState } from "react";

import BannerManager from "../components/banner-manager.component";
import EventsTable from "../components/events-table.component";
import Header from "../components/header.component";

import { Value } from "../model/value.d";
import { SimulationOrder } from "../model/simulation-order.d";
import { sendSimulationData } from "../api/simulation";
import { Event } from "../model/event.d";

import { websocketClient } from "../utils/websocket";
import type { WebsocketEvent } from "../model/websocketEvent";

const Home: React.FC = () => {
    const [valuesM1, setValuesM1] = useState<Value[]>([]);
    const [valuesM3, setValuesM3] = useState<Value[]>([]);
    const [isCheckedM1, setIsCheckedM1] = useState<boolean>(false);
    const [isCheckedM3, setIsCheckedM3] = useState<boolean>(false);
    const [modifiedValuesM1, setModifiedValuesM1] = useState<Record<string, string>>({});
    const [modifiedValuesM3, setModifiedValuesM3] = useState<Record<string, string>>({});
    const [toSimulateM1, setToSimulateM1] = useState<Record<string, boolean>>({});
    const [toSimulateM3, setToSimulateM3] = useState<Record<string, boolean>>({});
    const [events, setEvents] = useState<WebsocketEvent[]>([]);

    const handleM1StateChange = (modifiedValues: Record<string, string>, toSimulate: Record<string, boolean>) => {
        setModifiedValuesM1(modifiedValues);
        setToSimulateM1(toSimulate);

        if(!isCheckedM1) {
            handleSubmit();
        }
    };

    const handleM1Toggle = async () => {
        if(isCheckedM1) {
            for (const value of valuesM1) {
                console.log("Sending reset for M1 value:", value);
                const order: SimulationOrder = {
                    to_simulate: false,
                    iec_path: value.iec,
                    value: 0
                };
                await sendSimulationData(order);
            }
        }
        setIsCheckedM1(!isCheckedM1);
    };

    const handleM3Toggle = async () => {
        if(isCheckedM3) {
            for (const value of valuesM3) {
                console.log("Sending reset for M3 value:", value);
                const order: SimulationOrder = {
                    to_simulate: false,
                    iec_path: value.iec,
                    value: 0
                };
                await sendSimulationData(order);
            }
        }
        setIsCheckedM3(!isCheckedM3);
    };

    const handleM3StateChange = (modifiedValues: Record<string, string>, toSimulate: Record<string, boolean>) => {
        setModifiedValuesM3(modifiedValues);
        setToSimulateM3(toSimulate);

        if(!isCheckedM3) {
            handleSubmit();
        }       
    };

    const processReceivedData = (rawDataList: Value[]) => {
        const newM1: Value[] = [];
        const newM3: Value[] = [];

        rawDataList.forEach((item) => {
            if (item.origin === "M1") {
                newM1.push(item);
            } else if (item.origin === "M3") {
                newM3.push(item);
            }
        });

        setValuesM1(newM1);
        setValuesM3(newM3);
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
            const index = prevValues.findIndex((v) => v.iec === valueToInsert.iec);
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
            
            if (data.origin === "M1")
                insertValueIntoArray(data, setValuesM1);
            else if (data.origin === "M3") {
                insertValueIntoArray(data, setValuesM3);
            }
        });
    }, []);

    useEffect(() => {
        websocketClient.onValue("iec-get-all-values-response", (data: Value) => {
            const valuesArray: Value[] = Array.isArray(data) ? data : [];

            valuesArray.forEach((value) => {
                if (value.origin === "M1")
                    insertValueIntoArray(value, setValuesM1);
                else if (value.origin === "M3") {
                    insertValueIntoArray(value, setValuesM3);
                }
            });
        });
    }, []);

    useEffect(() => {
        websocketClient.onEvent("ihm_event", (data: WebsocketEvent) => {
            setEvents((prevEvents) => [...prevEvents, data]);
        });
    }, []);

    const handleSubmit = () => {
        const simulationOrders: SimulationOrder[] = [];

        valuesM1.forEach(value => {
            const currentValue = modifiedValuesM1[value.iec] !== undefined 
                ? Number(modifiedValuesM1[value.iec]) 
                : Number(value.val);
            const shouldSimulate = isCheckedM1 && (toSimulateM1[value.iec] !== undefined 
                ? toSimulateM1[value.iec] 
                : true);

            value.val = String(currentValue);
            insertValueIntoArray(value, setValuesM1);
            
            simulationOrders.push({
                to_simulate: shouldSimulate,
                iec_path: value.iec,
                value: currentValue
            });
        });

        valuesM3.forEach(value => {
            const currentValue = modifiedValuesM3[value.iec] !== undefined 
                ? Number(modifiedValuesM3[value.iec]) 
                : Number(value.val);
            const shouldSimulate = isCheckedM3 && (toSimulateM3[value.iec] !== undefined 
                ? toSimulateM3[value.iec] 
                : true);
            
            value.val = String(currentValue);
            insertValueIntoArray(value, setValuesM3);
            
            simulationOrders.push({
                to_simulate: shouldSimulate,
                iec_path: value.iec,
                value: currentValue
            });
        });

        simulationOrders.forEach(async (order) => {
            try {
                await sendSimulationData(order);
            } catch (error) {
                console.error(`Failed to send simulation data for ${order.iec_path}:`, error);
            }
        });
    };

    return (
        <>
            <Header />
            <div className="flex pt-4 w-full flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 px-2 sm:px-4">
                <BannerManager
                    title="Valeurs M1"
                    values={valuesM1}
                    isChecked={isCheckedM1}
                    onToggle={handleM1Toggle}
                    onStateChange={handleM1StateChange}
                />
                <BannerManager
                    title="Valeurs M3"
                    values={valuesM3}
                    isChecked={isCheckedM3}
                    onToggle={handleM3Toggle}
                    onStateChange={handleM3StateChange}
                />
            </div>
            { (isCheckedM1 || isCheckedM3) && <button onClick={handleSubmit} className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg z-50">
                Envoyer
            </button>}
            <EventsTable events={events} />
        </>
    );
};

export default Home;

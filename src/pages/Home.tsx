import React, { useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";

import { Value } from "../model/value.d";

import { websocketClient } from "../utils/websocket";

const Home: React.FC = () => {
    const [valuesM1, setValuesM1] = useState<Value[]>([]);
    const [valuesM3, setValuesM3] = useState<Value[]>([]);
    const [isCheckedM1, setIsCheckedM1] = useState<boolean>(true);
    const [isCheckedM3, setIsCheckedM3] = useState<boolean>(true);

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
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;

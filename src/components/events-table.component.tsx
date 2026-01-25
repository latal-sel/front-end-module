import React, { useEffect, useState } from "react";
import { WebsocketEvent } from "../model/websocketEvent.d";
import { fetchCriticities } from "../api/criticity";
import { fetchOrigins } from "../api/origin";

interface EventsTableProps {
    events: WebsocketEvent[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
    const [origins, setOrigins] = useState<any[]>([]);
    const [criticities, setCriticities] = useState<any[]>([]);

    useEffect(() => {
        fetchOrigins().then(setOrigins);
        fetchCriticities().then(setCriticities);
    }, []);
    
    return (
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
                        <td className="border border-gray-300 px-4 py-2">{origins.find(o => o.id === event.origin)?.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{event.message}</td>
                        <td className="border border-gray-300 px-4 py-2">{criticities.find(c => c.id === event.criticity)?.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EventsTable;

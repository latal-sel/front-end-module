import React from "react";
import { Event } from "../model/event.d";

interface EventsTableProps {
    events: Event[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
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
                        <td className="border border-gray-300 px-4 py-2">{event.origin.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{event.message}</td>
                        <td className="border border-gray-300 px-4 py-2">{event.criticity.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EventsTable;

import Header from "../components/header.component";
import FilterComponent from "../components/filter.component";
import { useEffect, useState } from 'react';
import cross from "../assets/cross.svg"
import type { Event } from "../model/event";
import { fetchEvents } from "../api/events";

const filters = [
    ['Date', 'timestamp'],
    ["Message", "message"],
    ["Origine", "origin"],
    ["Etat", "state"],
    ["Type", "eventType"]
];

export default function History() {
  const [visibleFilters, setVisibleFilters] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});  
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents().then((data) => setEvents(data));
  }, []);

  function toggleFilter(filterName: string) {
    setVisibleFilters((prevFilter) =>
      prevFilter === filterName ? null : filterName
    );
  };

  function handleFilterChange(filterName: string, value: string) {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [filterName]: value,
    }));
  }

  const filteredData: Event[] = events.filter((entry) => {
    return Object.entries(filterValues).every(([key, value]) => {
        if (!value) return true;
        const entryValue = (entry as Event)[key as keyof Event];
        return entryValue.toLowerCase().includes(value.toLowerCase());
    });
  }); 

  return (
    <>
      <Header />
      <div className="align-center pt-4 flex justify-center">
        <h1 className="text-2xl font-bold">Historique</h1>
      </div>
      <div className="flex mt-2 space-x-4 pl-24">
        {filters.map((filter) => (
          <div key={filter[1]}>
            <button 
              onClick={() => toggleFilter(filter[1])} 
              className="bg-blue-200 text-white px-4 rounded-md hover:bg-blue-400"
            >
              {filterValues[filter[1]] && <img src={cross} className="w-6 h-6 inline-block" alt="" onClick={() => handleFilterChange(filter[1], "")} />}
              {filterValues[filter[1]] ? `${filter[0]} : ${filterValues[filter[1]]}` : `➕ ${filter[0]}`}   
            </button>
            {visibleFilters === filter[1] ? <FilterComponent type={filter[0]} value={filterValues[filter[1]] || ""} filterOnChange={(value) => handleFilterChange(filter[1], value)} /> : null}
          </div>
        ))}
      </div>
      <table className="border-collapse border border-gray-500 w-9/10 mt-4 text-center justify-center mx-auto">
        <thead className="bg-blue-300"> 
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Origine</th>
            <th className="border border-gray-300 px-4 py-2">Etat</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="border border-gray-300 px-4 py-2">{entry.timestamp}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.message}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.origin}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.state}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.eventType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
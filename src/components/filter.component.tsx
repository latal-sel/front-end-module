import React, { useEffect, useState } from "react";
import { fetchEventTypes } from "../api/types";
import { fetchOrigins } from "../api/origin";
import { fetchStates } from "../api/states";

interface filterProps {
  type: string;
  value: string;
  filterOnChange: (value: string) => void;
}

const FilterComponent: React.FC<filterProps> = (props) => {
  const { type, value, filterOnChange } = props;
  const [origins, setOrigins] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [eventTypes, setEventTypes] = useState<any[]>([]);

  useEffect(() => {
    if (type === 'Origine') {
      fetchOrigins().then(setOrigins);
    } else if (type === 'Etat') {
      fetchStates().then(setStates);
    } else if (type === 'Type') {
      fetchEventTypes().then(setEventTypes);
    }
  }, [type]);

  return (
    <>
      {type === 'Date' && (
        <div className="w-1/10 h-1/10 fixed bg-white border border-gray-300 rounded-md p-2 mt-2">
          <h2>Filtre {type}</h2>
          <input type="date" value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
      )}
      {type === 'Message' && (
        <div className="w-1/10 h-1/10 fixed bg-white border border-gray-300 rounded-md p-2 mt-2">
          <h2>Filtre {type}</h2>
          <input type="text" value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
      )}
      {type === 'Origine' && (
        <div className="w-1/10 h-1/10 fixed bg-white border border-gray-300 rounded-md p-2 mt-2">
          <h2>Filtre {type}</h2>
          <select value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
            <option value=""></option>
            {origins.map(origin => (
              <option key={origin.id} value={origin.name}>{origin.name}</option>
            ))}
          </select>
        </div>
      )}
      {type === 'Etat' && (
        <div className="w-1/10 h-1/10 fixed bg-white border border-gray-300 rounded-md p-2 mt-2">
          <h2>Filtre {type}</h2>
          <select value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
            <option value=""></option>
            {states.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>
      )}
      {type === 'Type' && (
        <div className="w-1/10 h-1/10 fixed bg-white border border-gray-300 rounded-md p-2 mt-2">
          <h2>Filtre {type}</h2>
          <select value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
            <option value=""></option>
            {eventTypes.map(eventType => (
              <option key={eventType.id} value={eventType.name}>{eventType.name}</option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default FilterComponent;
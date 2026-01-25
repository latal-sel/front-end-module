import React, { useEffect, useState } from "react";
import { fetchCriticities } from "../api/criticity";
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
  const [criticities, setCriticities] = useState<any[]>([]);

  useEffect(() => {
    if (type === 'Origine') {
      fetchOrigins().then(setOrigins);
    } else if (type === 'Etat') {
      fetchStates().then(setStates);
    } else if (type === 'Criticité') {
      fetchCriticities().then(setCriticities);
    }
  }, [type]);

  return (
    <>
      {type === 'Date' && (
        <div className="w-48 sm:w-56 md:w-64 absolute bg-white border border-gray-300 rounded-md p-2 sm:p-3 mt-2 shadow-lg z-50">
          <h2 className="text-sm sm:text-base font-semibold mb-2">Filtre {type}</h2>
          <input type="date" value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"/>
        </div>
      )}
      {type === 'Message' && (
        <div className="w-48 sm:w-56 md:w-64 absolute bg-white border border-gray-300 rounded-md p-2 sm:p-3 mt-2 shadow-lg z-50">
          <h2 className="text-sm sm:text-base font-semibold mb-2">Filtre {type}</h2>
          <input type="text" value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"/>
        </div>
      )}
      {type === 'Origine' && (
        <div className="w-48 sm:w-56 md:w-64 absolute bg-white border border-gray-300 rounded-md p-2 sm:p-3 mt-2 shadow-lg z-50">
          <h2 className="text-sm sm:text-base font-semibold mb-2">Filtre {type}</h2>
          <select value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base">
            <option value=""></option>
            {origins.map(origin => (
              <option key={origin.id} value={origin.name}>{origin.name}</option>
            ))}
          </select>
        </div>
      )}
      {type === 'Etat' && (
        <div className="w-48 sm:w-56 md:w-64 absolute bg-white border border-gray-300 rounded-md p-2 sm:p-3 mt-2 shadow-lg z-50">
          <h2 className="text-sm sm:text-base font-semibold mb-2">Filtre {type}</h2>
          <select value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base">
            <option value=""></option>
            {states.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>
      )}
      {type === 'Criticité' && (
        <div className="w-48 sm:w-56 md:w-64 absolute bg-white border border-gray-300 rounded-md p-2 sm:p-3 mt-2 shadow-lg z-50">
          <h2 className="text-sm sm:text-base font-semibold mb-2">Filtre {type}</h2>
          <select value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base">
            <option value=""></option>
            {criticities.map(criticity => (
              <option key={criticity.id} value={criticity.name}>{criticity.name}</option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default FilterComponent;
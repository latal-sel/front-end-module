import Header from "../components/header.component";
import FilterComponent from "../components/filter.component";
import { useState } from 'react';
import cross from "../assets/cross.svg"

const historyData = [
    {
        date: "2024-06-01 10:00:00",
        titre: "Connexion établie",
        description: "La connexion au serveur a été établie avec succès.",
        origine: "Système",
        etat: "Succès"
    },
    {
        date: "2024-06-01 10:05:00",
        titre: "Erreur de communication",
        description: "Une erreur de communication est survenue avec le module M1.",
        origine: "Module M1",
        etat: "Échec"
    },
    {
        date: "2024-06-01 10:10:00",
        titre: "Redémarrage du système",
        description: "Le système a été redémarré par l'utilisateur.",
        origine: "Utilisateur",
        etat: "Succès"
    }
];

const filters = [
    "Date",
    "Titre",
    "Description",
    "Origine",
    "Etat"
];

export default function History() {
  const [visibleFilters, setVisibleFilters] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});  

  const toggleFilter = (filterName: string) => {
    setVisibleFilters((prevFilter) =>
      prevFilter === filterName ? null : filterName
    );
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [filterName]: value,
    }));
  }

  const filteredData = historyData.filter((entry) => {
    return Object.entries(filterValues).every(([key, value]) => {
      if (!value) return true;
        const entryValue = (entry as any)[key.toLowerCase()];
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
          <div key={filter}>
            <button 
              onClick={() => toggleFilter(filter)} 
              className="bg-blue-200 text-white px-4 rounded-md hover:bg-blue-400"
            >
              {filterValues[filter] && <img src={cross} className="w-6 h-6 inline-block" alt="" onClick={() => handleFilterChange(filter, "")} />}
              {filterValues[filter] ? `${filter} : ${filterValues[filter]}` : `➕ ${filter}`}   
            </button>
            {visibleFilters === filter ? <FilterComponent type={filter} value={filterValues[filter] || ""} filterOnChange={(value) => handleFilterChange(filter, value)} /> : null}
          </div>
        ))}
      </div>
      <table className="border-collapse border border-gray-500 w-9/10 mt-4 text-center justify-center mx-auto">
        <thead className="bg-yellow-300"> 
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Titre</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Origine</th>
            <th className="border border-gray-300 px-4 py-2">Etat</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.titre}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.description}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.origine}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.etat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
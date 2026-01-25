import Header from "../components/header.component";
import FilterComponent from "../components/filter.component";
import { useEffect, useState } from 'react';
import cross from "../assets/cross.svg"
import type { Event } from "../model/event";
import { fetchEvents } from "../api/events";

type FilterConfig = {
  label: string;
  key: string;
};

const filters: FilterConfig[] = [
  { label: 'Date', key: 'timestamp' },
  { label: 'Message', key: 'message' },
  { label: 'Origine', key: 'origin' },
  { label: 'Etat', key: 'state' },
  { label: 'Criticité', key: 'criticity' }
];

export default function History() {
  const [visibleFilters, setVisibleFilters] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});  
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    fetchEvents().then((data) => setEvents(data.reverse()));
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
    setCurrentPage(1);
  }

  const filteredData: Event[] = events.filter((entry) => {
    return Object.entries(filterValues).every(([key, value]) => {
        if (!value) return true;
        const entryValue = (entry as Event)[key as keyof Event];
        return typeof entryValue === 'string' ? entryValue.toLowerCase().includes(value.toLowerCase()) : entryValue.name.includes(value);
    });
  }); 

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  }

  function handleItemsPerPageChange(newItemsPerPage: number) {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }

  return (
    <>
      <Header />
      <div className="align-center pt-4 flex justify-center">
        <h1 className="text-2xl font-bold">Historique</h1>
      </div>
      <div className="flex mt-2 space-x-4 pl-24">
        {filters.map((filter) => (
          <div className="mt-4" key={filter.key}>
            <button 
              onClick={() => toggleFilter(filter.key)} 
              className="bg-blue-200 text-white px-4 rounded-md hover:bg-blue-400"
            >
              {filterValues[filter.key] && <img src={cross} className="w-6 h-6 inline-block" alt="" onClick={() => handleFilterChange(filter.key, "")} />}
                {filterValues[filter.key] 
                ? `${filter.label} : ${filterValues[filter.key].length > 10 ? filterValues[filter.key].substring(0, 10) + '...' : filterValues[filter.key]}` 
                : `➕ ${filter.label}`}
            </button>
            {visibleFilters === filter.key ? <FilterComponent type={filter.label} value={filterValues[filter.key] || ""} filterOnChange={(value) => handleFilterChange(filter.key, value)} /> : null}
          </div>
        ))} 
        <div className="flex justify-end items-center ml-auto pr-24">
          <select className="ml-4 p-2 border border-gray-300 rounded-md" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select> 
          <div className="ml-4">
            <button className="p-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-200" onClick={() => handlePageChange(currentPage - 1)}>{'<'}</button>
            <span className="pr-2">Page {currentPage} sur {totalPages}</span>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200" onClick={() => handlePageChange(currentPage + 1)}>{'>'}</button>
          </div>
        </div>
      </div>
      <table className="border-collapse border border-gray-500 w-9/10 mt-4 text-center justify-center mx-auto">
        <thead className="bg-blue-300"> 
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Origine</th>
            <th className="border border-gray-300 px-4 py-2">Etat</th>
            <th className="border border-gray-300 px-4 py-2">Criticité</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="border border-gray-300 px-4 py-2">{entry.timestamp}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.message}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.origin.name}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.state.name}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.criticity.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
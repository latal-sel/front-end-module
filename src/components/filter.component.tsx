interface filterProps {
  type: string;
  value: string;
  filterOnChange: (value: string) => void;
}

const FilterComponent: React.FC<filterProps> = (props) => {
  const { type, value, filterOnChange } = props;
    return (
        <div className="w-1/10 h-1/10 fixed bg-white border border-gray-300 rounded-md p-2 mt-2">
            <h2>Filtre {type}</h2>
            <input type="text" value={value} onChange={(e) => filterOnChange && filterOnChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" placeholder={`Insérer ${type?.toLowerCase()}`} />
        </div>
    );
}

export default FilterComponent;

import cross from "../assets/cross.svg";

import "../styles/component/network-config.css"
interface restartProps { 
    onRestartClick?: () => void;
}

export default function RestartComponent({ onRestartClick }: restartProps) {
    function handleRestart() {
        // Logic to handle restart
    }

    return (
        <div className="w-4/12 h-1/4 fixed bg-white border border-gray-300 rounded-md p-4 top-1/3 left-1/3 shadow-lg">
            <div className="flex justify-between w-full">
                <h1 className="text-lg font-semibold">Êtes-vous sûr de vouloir redémarrer ?</h1>
                <img className="flex justify-end w-6 h-6" src={cross} onClick={onRestartClick} alt="Close" />
            </div>
            <h3 className="text-sm text-gray-500 mt-2">Le redémarrage du système nécessitera la reconnexion du module M1.</h3>
            <div className="flex justify-end mt-25">
                <button className="btn bg-gray-100 text-black px-4 py-2 rounded-md mr-2" onClick={onRestartClick}>Annuler</button>
                <button className="btn bg-black text-white px-4 py-2 rounded-md" onClick={handleRestart}>Oui, redémarrer</button>
            </div>
        </div>
    );
}
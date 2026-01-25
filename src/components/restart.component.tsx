import cross from "../assets/cross.svg";
import { reloadSystem } from "../api/reload";
import '../styles/component/restart.css'

interface restartProps { 
    onRestartClick: () => void;
}

export default function RestartComponent({ onRestartClick }: restartProps) {
    function handleRestart() {
        reloadSystem();
        onRestartClick();
    }

    return (
        <div className="z-50 w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 h-auto fixed bg-white border border-gray-300 rounded-md p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
            <div className="flex justify-between w-full">
                <h1 className="text-lg font-semibold">Êtes-vous sûr de vouloir redémarrer ?</h1>
                <img className="flex justify-end w-6 h-6 cursor-pointer" src={cross} onClick={onRestartClick} alt="Close" />
            </div>
            <h3 className="text-sm text-gray-500 mt-2">Le redémarrage du système nécessitera la reconnexion du module M1.</h3>
            <div className="button-div">
                <button className="btn bg-gray-100 text-black px-4 py-2 rounded-md mr-2 cursor-pointer" onClick={onRestartClick}>Annuler</button>
                <button className="btn bg-black text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleRestart}>Oui, redémarrer</button>
            </div>
        </div>
    );
}
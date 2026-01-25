import React from "react";
import cross from "../assets/cross.svg";
import '../styles/component/restart.css'
import { uploadCIDfile } from "../api/file";

interface restartProps { 
    onRestartClick: () => void;
}

export default function CIDUploadComponent({ onRestartClick: closeVisibility }: restartProps) {
    const [file, setFile] = React.useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file && file.name.endsWith('.cid')) {
            setFile(file);
        } else {
            alert('Veuillez sélectionner un fichier avec l\'extension .cid');
            event.target.value = '';
        }
    };

    return (
        <div className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 h-auto fixed bg-white border border-gray-300 rounded-md p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
            <div className="flex justify-between w-full">
                <h1 className="text-lg font-semibold">Upload du fichier .cid</h1>
                <img className="flex justify-end w-6 h-6 cursor-pointer" src={cross} onClick={closeVisibility} alt="Close" />
            </div>
            <h3 className="text-sm text-gray-500 mt-2">Veuillez sélectionner un fichier .cid</h3>
            <input type="file" accept=".cid" onChange={handleFileChange} className="mt-5 btn bg-gray-100 text-black px-4 py-2 rounded-md mr-2 cursor-pointer"/>
            <div className="button-div">
                <button disabled={!file} className="btn bg-gray-100 text-black px-4 py-2 rounded-md mr-2 cursor-pointer" onClick={() => {
                    if (file) {
                        uploadCIDfile(file).then(() => {
                            alert('Fichier uploadé avec succès');
                        }).catch((error) => {
                            console.error('Error uploading file:', error);
                            alert('Erreur lors de l\'upload du fichier');
                        });
                        closeVisibility();
                    }
                }}>Envoyer</button>
            </div>
        </div>
    );
}
import logo from "../assets/SEL.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import NetworkConfigComponent from "./network-config.component";
import RestartComponent from "./restart.component";
import { Link } from "react-router-dom";
import CIDUploadComponent from "./cid-upload.component";


const Header: React.FC = () => {
    const [showNetworkConfig, setShowNetworkConfig] = React.useState(false);
    const [showRestart, setShowRestart] = React.useState(false);
    const [showCIDUpload, setShowCIDUpload] = React.useState(false);
    
    const navigate = useNavigate();
    
    const toggleNetworkConfig = (e?: React.MouseEvent<HTMLAnchorElement>) => {
        e?.preventDefault();
        setShowNetworkConfig(!showNetworkConfig);
    };
    
    const toggleRestart = (e?: React.MouseEvent<HTMLAnchorElement>) => {
        e?.preventDefault();
        setShowRestart(!showRestart);
    };

    const toggleCIDUpload = (e?: React.MouseEvent<HTMLAnchorElement>) => {
        e?.preventDefault();
        setShowCIDUpload(!showCIDUpload);
    };

    return (
        <>
        <header className="header shadow-md h-16">
            <div className="header-container mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-18 cursor-pointer" onClick={() => navigate("/")} />
                </div>
                <nav className="nav space-x-4">
                    <Link to="#" className="bg-gray-200 p-2 rounded-md" onClick={toggleCIDUpload}>Télécharger CID</Link>
                    <Link to="/" className="bg-gray-200 p-2 rounded-md">Supervision</Link>
                    <Link to="#" className="bg-gray-200 p-2 rounded-md" onClick={toggleNetworkConfig}>Configuration réseau</Link>
                    <Link to="/history" className="bg-gray-200 p-2 rounded-md">Historique</Link>
                    <Link to="#" className="bg-gray-200 p-2 rounded-md" onClick={toggleRestart}>Redémarrer</Link>
                </nav>
            </div>
        </header>
        {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
        {showRestart && <RestartComponent onRestartClick={toggleRestart} />} 
        {showCIDUpload && <CIDUploadComponent onRestartClick={toggleCIDUpload} />}
        </>
    );
}

export default Header;
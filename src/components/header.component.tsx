import logo from "../assets/SEL.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import NetworkConfigComponent from "./network-config.component";
import RestartComponent from "./restart.component";
import { Link } from "react-router-dom";


const Header: React.FC = () => {
    const [showNetworkConfig, setShowNetworkConfig] = React.useState(false);
    const [showRestart, setShowRestart] = React.useState(false);
    
    const navigate = useNavigate();
    
    const toggleNetworkConfig = (e?: React.MouseEvent<HTMLAnchorElement>) => {
        e?.preventDefault();
        setShowNetworkConfig(!showNetworkConfig);
    };
    
    const toggleRestart = (e?: React.MouseEvent<HTMLAnchorElement>) => {
        e?.preventDefault();
        setShowRestart(!showRestart);
    };

    return (
        <>
        <header className="header shadow-md h-16">
            <div className="header-container mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-18 cursor-pointer" onClick={() => navigate("/")} />
                </div>
                <nav className="nav space-x-4">
                     <Link to="/" className="bg-gray-200 p-2 rounded-md">Supervision</Link>
                    <Link to="#" className="bg-gray-200 p-2 rounded-md" onClick={toggleNetworkConfig}>Configuration réseau</Link>
                    <Link to="/history" className="bg-gray-200 p-2 rounded-md">Historique</Link>
                    <Link to="#" className="bg-gray-200 p-2 rounded-md" onClick={toggleRestart}>Redémarrer</Link>
                </nav>
            </div>
        </header>
        {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
        {showRestart && <RestartComponent onRestartClick={toggleRestart} />}  
        </>
    );
}

export default Header;
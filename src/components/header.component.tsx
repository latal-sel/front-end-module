import logo from "../assets/SEL.png";
import React from "react";
import NetworkConfigComponent from "./network-config.component";
import RestartComponent from "./restart.component";


const Header: React.FC = () => {
    const [showNetworkConfig, setShowNetworkConfig] = React.useState(false);
    const [showRestart, setShowRestart] = React.useState(false);
    
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
                    <img src={logo} alt="Logo" className="h-8 w-18" />
                </div>
                <nav className="nav space-x-4">
                    <a href="#" className="bg-gray-200 p-2 rounded-md" onClick={toggleNetworkConfig}>Configuration réseau</a>
                    <a href="/history" className="bg-gray-200 p-2 rounded-md">Historique</a>
                    <a href="#" className="bg-gray-200 p-2 rounded-md" onClick={toggleRestart}>Redémarrer</a>
                </nav>
            </div>
        </header>
        {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
        {showRestart && <RestartComponent onRestartClick={toggleRestart} />}  
        </>
    );
}

export default Header;
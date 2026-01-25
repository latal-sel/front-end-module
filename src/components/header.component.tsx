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
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    
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
                
                <button 
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                <nav className="nav hidden lg:flex lg:space-x-4">
                    <Link to="#" className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition" onClick={toggleCIDUpload}>Téléverser CID</Link>
                    <Link to="/" className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition">Supervision</Link>
                    <Link to="#" className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition" onClick={toggleNetworkConfig}>Configuration réseau</Link>
                    <Link to="/history" className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition">Historique</Link>
                    <Link to="#" className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition" onClick={toggleRestart}>Redémarrer</Link>
                </nav>
            </div>

            {mobileMenuOpen && (
                <nav className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
                    <div className="flex flex-col p-4 space-y-2">
                        <Link 
                            to="#" 
                            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition text-center" 
                            onClick={(e) => { toggleCIDUpload(e); setMobileMenuOpen(false); }}
                        >
                            Téléverser CID
                        </Link>
                        <Link 
                            to="/" 
                            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Supervision
                        </Link>
                        <Link 
                            to="#" 
                            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition text-center" 
                            onClick={(e) => { toggleNetworkConfig(e); setMobileMenuOpen(false); }}
                        >
                            Configuration réseau
                        </Link>
                        <Link 
                            to="/history" 
                            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Historique
                        </Link>
                        <Link 
                            to="#" 
                            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition text-center" 
                            onClick={(e) => { toggleRestart(e); setMobileMenuOpen(false); }}
                        >
                            Redémarrer
                        </Link>
                    </div>
                </nav>
            )}
        </header>
        {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
        {showRestart && <RestartComponent onRestartClick={toggleRestart} />} 
        {showCIDUpload && <CIDUploadComponent onRestartClick={toggleCIDUpload} />}
        </>
    );
}

export default Header;
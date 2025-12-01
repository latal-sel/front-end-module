import logo from "../assets/SEL.png";

interface headerProps { 
    onConfigClick?: () => void;
    onRestartClick?: () => void;
}


const Header: React.FC<headerProps> = ({ onConfigClick, onRestartClick }) => {
    return (
        <header className="header shadow-md h-16">
            <div className="header-container mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-18" />
                </div>
                <nav className="nav space-x-4">
                    <a href="#" className="bg-gray-200 p-2 rounded-md" onClick={onConfigClick}>Configuration réseau</a>
                    <a href="/history" className="bg-gray-200 p-2 rounded-md">Historique</a>
                    <a href="#" className="bg-gray-200 p-2 rounded-md" onClick={onRestartClick}>Redémarrer</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
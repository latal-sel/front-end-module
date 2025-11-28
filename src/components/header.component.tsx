import logo from "../assets/SEL.png";

interface headerProps { 
    onConfigClick?: () => void;
}

const navigation = [
    { name: 'Configuration réseau', href: '/' },
    { name: 'Historique', href: '/' },
    { name: 'Redémarrer', href: '/' },
];

const Header: React.FC<headerProps> = ({ onConfigClick }) => {
    return (
        <header className="header shadow-md h-16">
            <div className="header-container mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-18" />
                </div>
                <nav className="nav space-x-4">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.name === 'Configuration réseau' ? '#' : item.href}
                            className="bg-gray-200 p-2 rounded-md"
                            onClick={item.name === 'Configuration réseau' ? onConfigClick : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default Header;
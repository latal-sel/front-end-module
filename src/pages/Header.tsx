import logo from "../assets/SEL.png";

const navigation = [
    { name: 'Configuration réseau', href: '/' },
    { name: 'Historique', href: '/' },
    { name: 'Redémarrer', href: '/' },
];


export default function Header() {
    return (
        <header className="header shadow-md h-16">
            <div className="header-container mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-18" />
                </div>
                <nav className="nav space-x-4">
                    {navigation.map((item) => (
                        <a key={item.name} className="bg-gray-200 p-2 rounded-md" href={item.href}>{item.name}</a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
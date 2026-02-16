import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  const links = [
    { path: '/', label: 'HOME' },
    { path: '/sorting', label: 'SORTING' },
    { path: '/tree', label: 'TREE' },
    { path: '/search', label: 'SEARCH' },
    { path: '/math', label: 'MATH' },
  ];

  return (
    <header className="flex justify-between items-center w-full py-6 px-4 md:px-12 bg-transparent relative z-50">
        {/* Left: Mobile Menu Icon / Brand Element */}
        

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
                <Link key={link.path} to={link.path} className="relative group">
                    <span className={`text-sm font-bold tracking-widest ${location.pathname === link.path ? 'text-black' : 'text-gray-500 hover:text-black transition-colors'}`}>
                        {link.label}
                    </span>
                    {location.pathname === link.path && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black" />
                    )}
                </Link>
            ))}
        </nav>

        {/* Right: CTA Button */}
        {/* <div className="flex items-center">
            <Button className="rounded-full px-6 font-bold bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0_0_#999] active:shadow-[2px_2px_0_0_#999] active:translate-y-[2px] active:translate-x-[2px] transition-all">
                CONTACT
            </Button>
        </div> */}
    </header>
  );
}

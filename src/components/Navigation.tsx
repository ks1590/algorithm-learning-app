
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link to="/">
        <Button variant={location.pathname === '/' ? 'default' : 'outline'}>
          Sorting
        </Button>
      </Link>
      <Link to="/tree">
        <Button variant={location.pathname === '/tree' ? 'default' : 'outline'}>
          Tree
        </Button>
      </Link>
      <Link to="/search">
        <Button variant={location.pathname === '/search' ? 'default' : 'outline'}>
          Search
        </Button>
      </Link>
    </nav>
  );
}

import { Outlet, useLocation } from 'react-router-dom';

import { Navigation } from './Navigation';
import { PopTitle } from './ui/PopTitle';

export function Layout() {
  const location = useLocation();
  const isTopPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navigation />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 space-y-12 pb-16">
        {isTopPage && (
          <header className="text-center pt-8 md:pt-16">
            <PopTitle />
          </header>
        )}

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

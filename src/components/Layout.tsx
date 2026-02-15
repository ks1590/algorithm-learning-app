
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-black text-primary tracking-tight">ALGORITHM LEARNING</h1>
          <div className="flex justify-center mb-4">
             <Navigation />
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

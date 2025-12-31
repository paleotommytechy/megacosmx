import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 w-full bg-cosmic-navy/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="MegacosmX Logo" 
              className="w-8 rounded-full h-8 object-contain group-hover:opacity-80 bg-white transition-opacity"
            />
            <span className="text-xl font-bold text-white tracking-wide">
              Megacosm<span className="text-cosmic-cyan">X</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-white' : 'text-cosmic-silver hover:text-white'
              }`}
            >
              Discover
            </Link>
            <div className="h-4 w-px bg-white/10"></div>
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-sm font-medium text-cosmic-silver hover:text-cosmic-cyan transition-colors"
            >
              <ShieldCheck size={16} />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
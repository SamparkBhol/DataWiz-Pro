import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BarChart3, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Bot className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-1 text-white" />
          <span className="text-xl font-bold text-white">DataWiz Pro</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/analyze"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            Analyze
          </NavLink>
        </nav>
        <Link to="/analyze">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <BarChart3 className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
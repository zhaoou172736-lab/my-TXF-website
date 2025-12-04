import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_DATA } from '../../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/txf-logo.svg" 
              alt="Logo" 
              className="h-8 w-auto" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {MENU_DATA.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="text-white hover:text-blue-400 transition-colors text-sm font-medium flex items-center space-x-1"
                  onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-400 transition-colors">
              <Search size={20} />
            </button>
            <button className="text-white hover:text-blue-400 transition-colors">
              <User size={20} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
              立即加入
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {MENU_DATA.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.children && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </Link>
                {/* Mobile Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="ml-4 space-y-2 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
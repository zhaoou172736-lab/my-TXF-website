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
            <svg viewBox="805 1451 2510 1190" className="w-auto text-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="white" style={{ height: '1.5em', verticalAlign: 'middle' }}>
              <path d="M 805.0 1451.0 822.0 1556.0 900.0 1655.0 1005.0 1701.0 1167.0 1708.0 1201.0 1726.0 1229.0 1766.0 1235.0 2638.0 1419.0 2634.0 1462.0 2605.0 1488.0 2553.0 1487.0 1787.0 1520.0 1726.0 1586.0 1701.0 1642.0 1706.0 1685.0 1735.0 1887.0 2034.0 1497.0 2638.0 1690.0 2638.0 1797.0 2597.0 1865.0 2528.0 2040.0 2258.0 2258.0 2564.0 2338.0 2622.0 2416.0 2637.0 2417.0 2366.0 2190.0 2034.0 2507.0 1558.0 2575.0 1495.0 2667.0 1451.0 2393.0 1452.0 2290.0 1487.0 2210.0 1556.0 2040.0 1809.0 1859.0 1546.0 1803.0 1498.0 1734.0 1465.0 1653.0 1451.0 Z"></path>
              <path d="M 3311.0 1451.0 2758.0 1454.0 2692.0 1473.0 2638.0 1500.0 2583.0 1540.0 2527.0 1599.0 2478.0 1687.0 2457.0 1781.0 2457.0 2638.0 2552.0 2638.0 2594.0 2626.0 2645.0 2593.0 2686.0 2541.0 2702.0 2503.0 2709.0 2457.0 2711.0 2158.0 2955.0 2158.0 3001.0 2148.0 3072.0 2111.0 3117.0 2071.0 3151.0 2021.0 3168.0 1976.0 3173.0 1910.0 2712.0 1911.0 2710.0 1796.0 2733.0 1744.0 2764.0 1717.0 2806.0 1704.0 3088.0 1704.0 3124.0 1698.0 3179.0 1676.0 3237.0 1634.0 3279.0 1583.0 3304.0 1524.0 Z"></path>
            </svg>
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
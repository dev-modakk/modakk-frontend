'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

export const GiftBoxesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const menuItems = [
    { href: "/baby-gift-boxes", label: "Baby Gift Boxes" },
    { href: "/kids-gift-boxes", label: "Kids Gift Boxes" }
  ];

  return (
    <div className="flex items-center space-x-8">
      {navLinks.slice(1).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname === link.href
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
        >
          {link.label}
        </Link>
      ))}
      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={handleClick}
          className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Gift Boxes
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 origin-top ${isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
            }`}
          role="menu"
        >
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 focus:outline-none focus:bg-blue-50 focus:text-blue-600"
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
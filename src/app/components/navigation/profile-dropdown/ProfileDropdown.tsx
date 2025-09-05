'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LuUser, LuSettings, LuPackage, LuLogOut } from 'react-icons/lu';

interface ProfileDropdownProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isMobile = false,
  onItemClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const profileMenuItems = [
    { icon: <LuUser className="w-4 h-4" />, label: 'Account', href: '/account' },
    { icon: <LuSettings className="w-4 h-4" />, label: 'Settings', href: '/settings' },
    { icon: <LuPackage className="w-4 h-4" />, label: 'Orders', href: '/orders' },
    { icon: <LuLogOut className="w-4 h-4" />, label: 'Logout', href: '/logout' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
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
    };
  }, []);

  if (isMobile) {
    return (
      <div className="space-y-1">
        {profileMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleItemClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${item.label === 'Logout'
              ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <LuUser className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {profileMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleItemClick}
                className={`flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 ${item.label === 'Logout'
                  ? 'border-t border-gray-100 text-red-600 hover:text-red-700 hover:bg-red-50'
                  : ''
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
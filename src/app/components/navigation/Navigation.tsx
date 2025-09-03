'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AutoSuggestSearch } from './auto-suggest-search';
import { Authorization, GiftBoxesDropdown } from '../ui';
import { BasicNavOptions } from './basic-nav-options';
import { LuChevronDown, LuSearch } from 'react-icons/lu';

export const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileGiftBoxesOpen, setIsMobileGiftBoxesOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  const giftBoxLinks = [
    { href: "/baby-gift-boxes", label: "Baby Gift Boxes" },
    { href: "/kids-gift-boxes", label: "Kids Gift Boxes" }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileGiftBoxesOpen(false);
    setShowMobileSearch(false);
  };

  const toggleMobileGiftBoxes = () => {
    setIsMobileGiftBoxesOpen(!isMobileGiftBoxesOpen);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileGiftBoxesOpen(false);
    setShowMobileSearch(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <BasicNavOptions />

          <div className="hidden md:flex md:items-center md:justify-between md:flex-1 md:ml-10">
            <GiftBoxesDropdown />
            <AutoSuggestSearch />
            <Authorization />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleMobileSearch}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <LuSearch className="h-5 w-5" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {showMobileSearch && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search gift boxes..."
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <LuSearch className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${pathname === link.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative">
                <button
                  onClick={toggleMobileGiftBoxes}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  Gift Boxes
                  <LuChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isMobileGiftBoxesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isMobileGiftBoxesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {giftBoxLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname === item.href
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 pb-2 border-t border-gray-200 mt-4 space-y-2">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
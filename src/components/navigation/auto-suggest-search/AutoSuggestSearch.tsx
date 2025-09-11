'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSearch, LuClock, LuTrendingUp, LuBookmark, LuPackage } from 'react-icons/lu';

const suggestions: SearchSuggestion[] = [
  { id: '1', title: 'Baby Gift Boxes', subtitle: 'Popular category', type: 'trending', icon: <LuTrendingUp className="w-4 h-4" /> },
  { id: '2', title: 'Kids Art Supplies', subtitle: 'Recent search', type: 'recent', icon: <LuClock className="w-4 h-4" /> },
  { id: '3', title: 'Birthday Gifts', subtitle: 'Category', type: 'category', icon: <LuPackage className="w-4 h-4" /> },
  { id: '4', title: 'Squishmallow Collection', subtitle: 'Product', type: 'product', icon: <LuPackage className="w-4 h-4" /> },
  { id: '5', title: 'Educational Toys', subtitle: 'Popular search', type: 'trending', icon: <LuTrendingUp className="w-4 h-4" /> },
  { id: '6', title: 'Gift Boxes for Toddlers', subtitle: 'Recent', type: 'recent', icon: <LuClock className="w-4 h-4" /> },
  { id: '7', title: 'Science Kits', subtitle: 'Saved search', type: 'recent', icon: <LuBookmark className="w-4 h-4" /> },
];
interface SearchSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  type: 'recent' | 'trending' | 'product' | 'category';
  icon: React.ReactNode;
}

export const AutoSuggestSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);



  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
    suggestion.subtitle?.toLowerCase().includes(query.toLowerCase())
  );

  const displaySuggestions = query ? filteredSuggestions : suggestions.slice(0, 5);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < displaySuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          setQuery(displaySuggestions[selectedIndex].title);
          setIsOpen(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trending': return 'text-green-600';
      case 'recent': return 'text-blue-600';
      case 'product': return 'text-purple-600';
      case 'category': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'trending': return 'Trending';
      case 'recent': return 'Recent';
      case 'product': return 'Product';
      case 'category': return 'Category';
      default: return '';
    }
  };

  return (
    <div className="relative flex-1 max-w-xl mx-8">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search gift boxes..."
          className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <LuSearch className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
          >
            {displaySuggestions.length > 0 ? (
              <div className="py-1">
                {displaySuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`px-4 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between group ${selectedIndex === index
                      ? 'bg-blue-50 border-l-2 border-blue-500'
                      : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${getTypeColor(suggestion.type)} group-hover:scale-110 transition-transform duration-150`}>
                        {suggestion.icon}
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium text-sm">
                          {suggestion.title}
                        </div>
                        {suggestion.subtitle && (
                          <div className="text-gray-500 text-xs">
                            {suggestion.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                      {getTypeLabel(suggestion.type)}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">
                No suggestions found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
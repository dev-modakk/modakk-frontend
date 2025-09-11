'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LuShoppingCart, LuX, LuPlus, LuMinus } from 'react-icons/lu';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDropdownProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({
  isMobile = false,
  onItemClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Epic Squishmallow Fun',
      price: 39.95,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Science Explorer Kit',
      price: 69.95,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop'
    }
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
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
      <div className="px-3 py-2">
        <Link
          href="/cart"
          onClick={handleItemClick}
          className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <LuShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </div>
            <span>Cart</span>
          </div>
          <span className="text-sm text-gray-500">
            ${totalPrice.toFixed(2)}
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <LuShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
            <p className="text-sm text-gray-500">{totalItems} items</p>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {cartItems.length > 0 ? (
              <div className="p-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                      >
                        <LuMinus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                      >
                        <LuPlus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-600 ml-2"
                      >
                        <LuX className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <LuShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Your cart is empty</p>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={handleItemClick}
                  className="block w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-center text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={handleItemClick}
                  className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
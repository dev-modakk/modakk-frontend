'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LuMinus, LuPlus, LuX, LuShoppingCart, LuArrowLeft, LuTruck, LuShield, LuClock, LuHeart } from 'react-icons/lu';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: string;
  inStock: boolean;
  maxQuantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Epic Squishmallow Fun',
      price: 39.95,
      originalPrice: 49.95,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      category: 'Plush Toys',
      inStock: true,
      maxQuantity: 5
    },
    {
      id: '2',
      name: 'Science Explorer Kit',
      price: 69.95,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop',
      category: 'Educational',
      inStock: true,
      maxQuantity: 3
    },
    {
      id: '3',
      name: 'Art Supplies Creative Box',
      price: 29.95,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
      category: 'Arts & Crafts',
      inStock: false,
      maxQuantity: 10
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);

  const updateQuantity = (id: string, newQuantity: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    if (newQuantity > item.maxQuantity) {
      newQuantity = item.maxQuantity;
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

  const toggleWishlist = (id: string) => {
    setWishlistedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const moveToWishlist = (id: string) => {
    toggleWishlist(id);
    removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo('SAVE10');
      setPromoCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo === 'SAVE10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 75 ? 0 : 9.95;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const inStockItems = cartItems.filter(item => item.inStock);
  const outOfStockItems = cartItems.filter(item => !item.inStock);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
            <LuShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any gift boxes yet.</p>
            <Link
              href="/kids-gift-boxes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              <LuArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6 sm:mb-8">
          <Link
            href="/kids-gift-boxes"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors duration-200"
          >
            <LuArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Shopping Cart</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">

            {inStockItems.length > 0 && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Items</h3>
                <div className="space-y-4">
                  {inStockItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              {item.originalPrice && (
                                <span className="text-xs sm:text-sm text-gray-400 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors duration-200"
                                disabled={item.quantity <= 1}
                              >
                                <LuMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                <LuPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>

                            <div className="text-xs sm:text-sm text-gray-500">
                              ${(item.price * item.quantity).toFixed(2)} total
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                            >
                              <LuHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Save for later</span>
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                            >
                              <LuX className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {outOfStockItems.length > 0 && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Out of Stock Items</h3>
                <div className="space-y-4">
                  {outOfStockItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 border border-red-200 rounded-xl bg-red-50 opacity-75">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg flex-shrink-0 grayscale"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h4>
                            <p className="text-xs sm:text-sm text-red-600 font-medium">Out of Stock</p>
                          </div>
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="text-xs sm:text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                            >
                              <LuHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Save for later</span>
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                            >
                              <LuX className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-green-600 mt-1">Promo code applied!</p>
                )}
              </div>

              <Link
                href="/checkout"
                className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-xl transition-colors duration-200 mb-4"
              >
                Proceed to Checkout
              </Link>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <LuTruck className="w-4 h-4 text-green-500" />
                  <span>Free shipping on orders over $75</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuShield className="w-4 h-4 text-blue-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuClock className="w-4 h-4 text-purple-500" />
                  <span>Fast 2-3 day delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
'use client';
import React, { useState } from 'react';
import { LuArrowRight, LuChevronUp, LuClock, LuFacebook, LuGift, LuHeart, LuInstagram, LuMail, LuMapPin, LuPhone, LuShield, LuStar, LuTruck, LuTwitter, LuYoutube } from 'react-icons/lu';

export const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paymentMethods = [
    { name: 'American Express', color: 'bg-blue-600' },
    { name: 'Apple Pay', color: 'bg-black' },
    { name: 'Google Pay', color: 'bg-gray-700' },
    { name: 'Mastercard', color: 'bg-red-500' },
    { name: 'Shop Pay', color: 'bg-blue-600' },
    { name: 'Visa', color: 'bg-blue-800' }
  ];

  const quickLinks = [
    { name: 'Gift Boxes', href: '#' },
    { name: 'Best Sellers', href: '#' },
    { name: 'New Arrivals', href: '#' },
    { name: 'Age Groups', href: '#' },
    { name: 'Themes', href: '#' },
    { name: 'Custom Boxes', href: '#' }
  ];

  const supportLinks = [
    { name: 'Shipping', href: '#' },
    { name: 'FAQ\'s', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Contact Us', href: '#' }
  ];

  return (
    <footer className="relative py-8 px-4 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="py-8 sm:py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <LuGift className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">Modakk</span>
                </div>

                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Creating magical moments and unforgettable memories with carefully curated gift boxes designed to spark joy and imagination in every child.
                </p>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                    <LuMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div>P.O. Box 36110 Northcote 0748</div>
                      <div>Auckland, New Zealand</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                    <LuMail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                    <a href="mailto:hello@epickids.co.nz" className="hover:text-blue-600 transition-colors duration-200 break-all">
                      hello@epickids.co.nz
                    </a>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                    <LuPhone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                    <a href="tel:022 129 0418" className="hover:text-blue-600 transition-colors duration-200">
                      022 129 0418
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-400 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-red-600 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                  <LuGift className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Shop
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group text-sm sm:text-base"
                      >
                        <LuArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                  <LuShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Support
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {supportLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group text-sm sm:text-base"
                      >
                        <LuArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                  <LuHeart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                  Trust & Values
                </h3>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                    <LuTruck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span>Fast & Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                    <LuShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                    <LuClock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                    <span>24/7 Customer Support</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-300">
                  <div className="text-xs sm:text-sm text-gray-600 mb-2">In support of</div>
                  <div className="flex items-center gap-2">
                    <LuStar className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                    <div>
                      <div className="text-gray-800 font-bold text-sm sm:text-base">Starship</div>
                      <div className="text-xs sm:text-sm text-gray-600">Foundation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <div className="flex flex-col items-center gap-4 sm:gap-6">

              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm">
                  © 2025, Modakk Gift Boxes. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Made with <LuHeart className="w-3 h-3 inline text-red-500 fill-current" /> for amazing kids everywhere
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <span className="text-xs sm:text-sm text-gray-600">We accept:</span>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className={`w-10 h-6 sm:w-12 sm:h-8 ${method.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md`}
                    >
                      {method.name.split(' ')[0].slice(0, 4).toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <LuChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </footer>
  );
};
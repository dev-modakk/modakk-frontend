'use client';
import React, { useState } from 'react';
import { LuArrowRight, LuChevronUp, LuClock, LuFacebook, LuGift, LuHeart, LuInstagram, LuMail, LuMapPin, LuPhone, LuShield, LuStar, LuTruck, LuTwitter, LuYoutube } from 'react-icons/lu';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

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
    <footer className="relative min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200">

          <div className="border-b border-gray-200 pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <LuGift className="w-8 h-8 text-blue-600" />
                <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
                  Stay Connected
                </span>
                <LuGift className="w-8 h-8 text-blue-600" />
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                Get Epic Updates!
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                Be the first to know about new gift boxes, exclusive offers, and magical surprises for your little ones
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 flex items-center gap-2 justify-center"
                >
                  {isSubscribed ? (
                    <>
                      <LuHeart className="w-5 h-5 fill-current" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <LuArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <LuShield className="w-4 h-4 text-green-500" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuGift className="w-4 h-4 text-blue-500" />
                  <span>Exclusive offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuStar className="w-4 h-4 text-yellow-500" />
                  <span>Early access</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <LuGift className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">Modakk</span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Creating magical moments and unforgettable memories with carefully curated gift boxes designed to spark joy and imagination in every child.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <LuMapPin className="w-5 h-5 text-blue-500" />
                    <div>
                      <div>P.O. Box 36110 Northcote 0748</div>
                      <div>Auckland, New Zealand</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <LuMail className="w-5 h-5 text-blue-500" />
                    <a href="mailto:hello@epickids.co.nz" className="hover:text-blue-600 transition-colors duration-200">
                      hello@epickids.co.nz
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <LuPhone className="w-5 h-5 text-blue-500" />
                    <a href="tel:022 129 0418" className="hover:text-blue-600 transition-colors duration-200">
                      022 129 0418
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuFacebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-400 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuTwitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-red-600 transition-all duration-200 transform hover:scale-110 border border-gray-300">
                    <LuYoutube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <LuGift className="w-5 h-5 text-blue-500" />
                  Shop
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <LuArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <LuShield className="w-5 h-5 text-blue-500" />
                  Support
                </h3>
                <ul className="space-y-3">
                  {supportLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <LuArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <LuHeart className="w-5 h-5 text-pink-500" />
                  Trust & Values
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <LuTruck className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Fast & Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <LuShield className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <LuClock className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">24/7 Customer Support</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-300">
                  <div className="text-sm text-gray-600 mb-2">In support of</div>
                  <div className="flex items-center gap-2">
                    <LuStar className="w-6 h-6 text-pink-500" />
                    <div>
                      <div className="text-gray-800 font-bold">Starship</div>
                      <div className="text-sm text-gray-600">Foundation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              <div className="text-center lg:text-left">
                <p className="text-gray-600 text-sm">
                  © 2025, Modakk Gift Boxes. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Made with <LuHeart className="w-3 h-3 inline text-red-500 fill-current" /> for amazing kids everywhere
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-600 mr-2">We accept:</span>
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`w-12 h-8 ${method.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md`}
                  >
                    {method.name.split(' ')[0].slice(0, 4).toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <LuChevronUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;
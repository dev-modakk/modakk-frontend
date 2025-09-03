'use client';
import { GiftBoxesProductCard } from '@/app/components';
import React, { useState } from 'react';
import { LuGift, LuHeart, LuStar } from 'react-icons/lu';

export const KidsGiftBoxSection: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200">

          <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">
            Kids Gift Boxes
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Carefully curated gift boxes designed to spark joy and imagination
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 font-medium mb-12">
            <div className="flex items-center gap-2">
              <LuStar className="w-5 h-5 text-yellow-500" />
              <span>Premium Quality</span>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <LuGift className="w-5 h-5 text-purple-500" />
              <span>Curated Selection</span>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <LuHeart className="w-5 h-5 text-red-500" />
              <span>Kids Approved</span>
            </div>
          </div>

          <GiftBoxesProductCard />

          <div className="mt-12">
            <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-colors duration-200 shadow-lg">
              <span className="flex items-center gap-3 justify-center">
                <LuGift className="w-6 h-6" />
                Shop All Gift Boxes
              </span>
            </button>

            <p className="text-gray-600 mt-6 text-sm font-medium">
              Free shipping on orders over $75 • 30-day returns • Kid-tested & approved
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
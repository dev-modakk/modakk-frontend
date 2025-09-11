'use client';
import { GiftBoxesProductCard } from '@/components';
import React from 'react';
import { LuGift, LuLoader } from 'react-icons/lu';
import { useKidsGiftBoxesHomepage } from '@/query-hooks/kids-gift-boxes/useKidsGiftBoxesQuery';
import Link from 'next/link';

export const KidsGiftBoxSection: React.FC = () => {
  const { data: giftBoxes = [], isLoading, error, refetch } = useKidsGiftBoxesHomepage();
  return (
    <div className="min-h-screen py-8 px-4 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-sm border border-gray-200">

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-gray-900 tracking-tight leading-tight">
            Kids Gift Boxes
          </h1>

          <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
            Carefully curated gift boxes designed to spark joy and imagination
          </p>

          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600 font-medium mb-8 md:mb-12">
            <div className="flex items-center gap-2">
              <LuStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span>Premium Quality</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <LuGift className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <span>Curated Selection</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <LuHeart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              <span>Kids Approved</span>
            </div>
          </div> */}

          <div className="mb-8 md:mb-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <LuLoader className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-slate-600 text-lg">Loading gift boxes...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Unable to load gift boxes at the moment.</p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <GiftBoxesProductCard giftBoxes={giftBoxes} />
            )}
          </div>

          <div>
            <Link href="/kids-gift-boxes">
              <button className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base md:text-lg rounded-xl transition-colors duration-200 shadow-lg">
                <span className="flex items-center gap-2 md:gap-3 justify-center whitespace-nowrap">
                  <LuGift className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="hidden xs:inline">Shop All Gift Boxes</span>
                  <span className="xs:hidden">Shop All</span>
                </span>
              </button>
            </Link>

            <p className="text-gray-600 mt-4 md:mt-6 text-xs md:text-sm font-medium px-2">
              Free shipping on orders over $75 • 30-day returns • Kid-tested & approved
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
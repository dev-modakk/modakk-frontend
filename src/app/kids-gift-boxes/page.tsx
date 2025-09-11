'use client';

import React from 'react';
import Link from 'next/link';
import {
  LuFilter,
  LuGrid3X3,
  LuList,
  LuStar,
  LuHeart,
  LuShoppingCart,
  LuSearch,
  LuLoader,
} from 'react-icons/lu';
import { Footer, Pagination } from '@/components';
import { useKidsGiftBoxesStore } from '@/store';
import { useKidsGiftBoxesQuery } from '@/query-hooks/kids-gift-boxes/useKidsGiftBoxesQuery';


interface KidsGiftBox {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  ageRange: string;
  description: string;
  badge?: string;
  inStock: boolean;
  featured: boolean;
}

const KidsGiftBoxesPage: React.FC = () => {

  const {
    searchQuery,
    selectedCategory,
    selectedAge,
    sortBy,
    viewMode,
    showFilters,
    wishlistedItems,
    currentPage,
    pageSize,
    setSearchQuery,
    setSelectedCategory,
    setSelectedAge,
    setSortBy,
    setViewMode,
    setShowFilters,
    toggleWishlist,
    clearFilters,
    setCurrentPage,
    setPageSize,
  } = useKidsGiftBoxesStore();

  // Use React Query for data fetching instead of useEffect + Zustand
  const {
    data,
    isLoading,
    error: queryError,
    refetch
  } = useKidsGiftBoxesQuery({
    page: currentPage,
    limit: pageSize,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    ageRange: selectedAge !== 'all' ? selectedAge : undefined,
    search: searchQuery || undefined,
    sortBy: sortBy || undefined
  });

  // Extract data from React Query response
  const apiGiftBoxes = data?.items || [];
  const apiTotal = data?.total || 0;
  const apiTotalPages = data?.totalPages || 1;
  const apiLoading = isLoading;
  const apiError = queryError;



  const categories = [
    'all',
    'Gift Boxes',
    'Toys',
  ];

  const ageRanges = ['all', '3-5 years', '6-8 years', '9-12 years', '13+ years'];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Popular':
        return 'bg-blue-600 text-white';
      case 'New':
      case 'New Arrival':
        return 'bg-green-600 text-white';
      case 'Bestseller':
      case 'Best Seller':
        return 'bg-purple-600 text-white';
      case 'Limited':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Use API data instead of Zustand filtered data
  const filteredAndSortedBoxes = apiGiftBoxes;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Kids Gift Boxes
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Discover magical gift boxes carefully curated to spark joy and
              imagination in every child
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search gift boxes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors duration-200 sm:hidden"
              >
                <LuFilter className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-1 border border-slate-300 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <LuGrid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <LuList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${showFilters ? 'block' : 'hidden'
              } sm:block bg-white rounded-xl p-4 sm:p-6 border border-slate-200 mb-6`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Age Range
                </label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ageRanges.map((age) => (
                    <option key={age} value={age}>
                      {age === 'all' ? 'All Ages' : age}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>


        {apiLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <LuLoader className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-slate-600 text-lg">Loading gift boxes...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {apiError && !apiLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuSearch className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No kids gift boxes found
            </h3>
            <p className="text-slate-600 mb-6">
              {(apiError as any)?.message || 'We encountered an error while loading the gift boxes. Please try again later.'}
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {!apiLoading && !apiError && (
          <>
            <div className="mb-6">
              <p className="text-slate-600">
                Showing {filteredAndSortedBoxes.length} of {apiTotal} gift
                boxes
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedBoxes.map((box: KidsGiftBox) => (
                  <div
                    key={box.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative">

                      <Link
                        href={`/product/${box.id}`}
                        className="block"
                        aria-label={`View ${box.name}`}
                      >
                        <img
                          src={box.image}
                          alt={box.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>


                      {box.badge && (
                        <div
                          className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold ${getBadgeColor(
                            box.badge
                          )} pointer-events-none`}
                        >
                          {box.badge}
                        </div>
                      )}


                      <button
                        onClick={() => toggleWishlist(box.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200 z-10"
                        aria-label="Toggle wishlist"
                      >
                        <LuHeart
                          className={`w-4 h-4 ${wishlistedItems.includes(box.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                            }`}
                        />
                      </button>


                      {!box.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                          <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <LuStar
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(box.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">
                          ({box.reviews})
                        </span>
                      </div>


                      <Link
                        href={`/product/${box.id}`}
                        className="block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">
                          {box.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 mb-2">{box.ageRange}</p>

                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {box.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {box.originalPrice && (
                            <span className="text-sm text-slate-400 line-through">
                              ${box.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-slate-900">
                            ${box.price.toFixed(2)}
                          </span>
                        </div>

                        <button
                          disabled={!box.inStock}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${box.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                          <LuShoppingCart className="w-4 h-4" />
                          {box.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedBoxes.map((box: KidsGiftBox) => (
                  <div
                    key={box.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Whole row clickable in list view */}
                    <Link
                      href={`/product/${box.id}`}
                      className="flex flex-col sm:flex-row"
                    >
                      <div className="relative sm:w-48 h-48 flex-shrink-0">
                        <img
                          src={box.image}
                          alt={box.name}
                          className="w-full h-full object-cover"
                        />

                        {box.badge && (
                          <div
                            className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold ${getBadgeColor(
                              box.badge
                            )} pointer-events-none`}
                          >
                            {box.badge}
                          </div>
                        )}

                        {!box.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                            <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between h-full">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <LuStar
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(box.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-slate-500">
                                ({box.reviews} reviews)
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                              {box.name}
                            </h3>

                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-sm text-blue-600 font-medium">
                                {box.category}
                              </span>
                              <span className="text-sm text-slate-600">
                                {box.ageRange}
                              </span>
                            </div>

                            <p className="text-slate-600 leading-relaxed">
                              {box.description}
                            </p>
                          </div>

                          <div className="flex flex-row sm:flex-col sm:items-end justify-between sm:justify-start gap-4 mt-4 sm:mt-0 sm:ml-6">
                            <div className="text-right">
                              {box.originalPrice && (
                                <div className="text-sm text-slate-400 line-through">
                                  ${box.originalPrice.toFixed(2)}
                                </div>
                              )}
                              <div className="text-2xl font-bold text-slate-900">
                                ${box.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Actions outside <Link/>; prevent navigation when clicked */}
                    <div className="px-6 pb-6 flex gap-2 justify-end">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(box.id);
                        }}
                        className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                        aria-label="Toggle wishlist"
                      >
                        <LuHeart
                          className={`w-4 h-4 ${wishlistedItems.includes(box.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                            }`}
                        />
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // add-to-cart here
                        }}
                        disabled={!box.inStock}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${box.inStock
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                      >
                        <LuShoppingCart className="w-4 h-4" />
                        {box.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredAndSortedBoxes.length === 0 && !apiLoading && !apiError && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LuSearch className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No gift boxes found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!apiLoading && !apiError && apiGiftBoxes.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={apiTotalPages}
              pageSize={pageSize}
              total={apiTotal}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              className="border-t pt-6"
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default KidsGiftBoxesPage;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LuFilter,
  LuGrid3X3,
  LuList,
  LuStar,
  LuHeart,
  LuShoppingCart,
  LuSearch,
} from 'react-icons/lu';
import { Footer } from '@/components';


interface GiftBox {
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

const BabyGiftBoxesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);

  const giftBoxes: GiftBox[] = [
    {
      id: '1',
      name: 'Newborn Essentials Bundle',
      price: 89.95,
      originalPrice: 109.95,
      rating: 4.9,
      reviews: 245,
      image:
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
      category: 'Newborn Care',
      ageRange: '0-3 months',
      description:
        "Everything new parents need including organic cotton clothes, blankets, and gentle care products.",
      badge: 'Popular',
      inStock: true,
      featured: true,
    },
    {
      id: '2',
      name: 'Sensory Development Kit',
      price: 64.95,
      rating: 4.8,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      category: 'Development & Learning',
      ageRange: '3-6 months',
      description:
        "Carefully selected toys and activities to stimulate baby's developing senses and motor skills.",
      badge: 'New',
      inStock: true,
      featured: true,
    },
    {
      id: '3',
      name: 'First Foods Explorer Box',
      price: 49.95,
      rating: 4.7,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1544842919-3a59e35b67a4?w=400&h=400&fit=crop',
      category: 'Feeding & Nutrition',
      ageRange: '6-12 months',
      description:
        'Safe feeding essentials and organic baby food starter sets for introducing solids.',
      inStock: true,
      featured: false,
    },
    {
      id: '4',
      name: "Baby's First Books Collection",
      price: 34.95,
      rating: 4.8,
      reviews: 198,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'Books & Storytelling',
      ageRange: '0-12 months',
      description:
        'Soft fabric books, board books, and interactive story collections perfect for bedtime reading.',
      badge: 'Bestseller',
      inStock: true,
      featured: true,
    },
    {
      id: '5',
      name: 'Bathtime Fun Bundle',
      price: 42.95,
      rating: 4.6,
      reviews: 134,
      image:
        'https://images.unsplash.com/photo-1559127452-34b1ba8beb64?w=400&h=400&fit=crop',
      category: 'Bath & Hygiene',
      ageRange: '3-12 months',
      description:
        'Gentle bath products, soft towels, and fun bath toys to make bathtime enjoyable.',
      inStock: true,
      featured: false,
    },
    {
      id: '6',
      name: 'Sleep Time Comfort Set',
      price: 76.95,
      rating: 4.9,
      reviews: 267,
      image:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop',
      category: 'Sleep & Comfort',
      ageRange: '0-6 months',
      description:
        'Premium sleep essentials including swaddles, sleep sacks, and soothing night lights.',
      badge: 'Premium',
      inStock: true,
      featured: true,
    },
    {
      id: '7',
      name: 'Tummy Time Activity Mat',
      price: 52.95,
      rating: 4.7,
      reviews: 112,
      image:
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop',
      category: 'Play & Activity',
      ageRange: '3-9 months',
      description:
        'Soft activity mat with hanging toys and textures to encourage tummy time and development.',
      inStock: false,
      featured: false,
    },
    {
      id: '8',
      name: 'Organic Cotton Clothing Set',
      price: 67.95,
      rating: 4.8,
      reviews: 178,
      image:
        'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=400&h=400&fit=crop',
      category: 'Clothing & Accessories',
      ageRange: '0-6 months',
      description:
        'Luxuriously soft organic cotton onesies, sleepers, and accessories in neutral colors.',
      badge: 'Eco-Friendly',
      inStock: true,
      featured: false,
    },
  ];

  const categories = [
    'all',
    'Newborn Care',
    'Development & Learning',
    'Feeding & Nutrition',
    'Books & Storytelling',
    'Bath & Hygiene',
    'Sleep & Comfort',
    'Play & Activity',
    'Clothing & Accessories',
  ];

  const ageRanges = ['all', '0-3 months', '3-6 months', '6-12 months', '12+ months'];

  const toggleWishlist = (id: string) => {
    setWishlistedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Popular':
        return 'bg-blue-600 text-white';
      case 'New':
        return 'bg-green-600 text-white';
      case 'Bestseller':
        return 'bg-purple-600 text-white';
      case 'Premium':
        return 'bg-amber-600 text-white'; // Tailwind-safe "gold"
      case 'Eco-Friendly':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const filteredAndSortedBoxes = giftBoxes
    .filter((box) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        box.name.toLowerCase().includes(q) || box.description.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || box.category === selectedCategory;
      const matchesAge =
        selectedAge === 'all' || box.ageRange.includes(selectedAge.split('-')[0]);
      return matchesSearch && matchesCategory && matchesAge;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header & controls */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Baby Gift Boxes
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Thoughtfully curated gift boxes designed to support your baby's development and bring joy to new parents
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search baby gift boxes..."
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

          {/* Filters */}
          <div
            className={`${showFilters ? 'block' : 'hidden'
              } sm:block bg-white rounded-xl p-4 sm:p-6 border border-slate-200 mb-6`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Age Range</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
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
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedAge('all');
                    setSortBy('featured');
                    setSearchQuery('');
                  }}
                  className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredAndSortedBoxes.length} of {giftBoxes.length} baby gift boxes
          </p>
        </div>

        {/* GRID VIEW */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBoxes.map((box) => (
              <div
                key={box.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative">
                  {/* Make image clickable */}
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

                  {/* Badge overlay shouldn't block clicks */}
                  {box.badge && (
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold ${getBadgeColor(
                        box.badge
                      )} pointer-events-none`}
                    >
                      {box.badge}
                    </div>
                  )}

                  {/* Wishlist (kept above the link) */}
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

                  {/* Out-of-stock overlay shouldn't block clicks */}
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
                    <span className="text-xs text-slate-500">({box.reviews})</span>
                  </div>

                  {/* Make title clickable too */}
                  <Link
                    href={`/product/${box.id}`}
                    className="block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">{box.name}</h3>
                  </Link>

                  <p className="text-xs text-slate-600 mb-2">{box.ageRange}</p>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{box.description}</p>

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
          /* LIST VIEW */
          <div className="space-y-4">
            {filteredAndSortedBoxes.map((box) => (
              <div
                key={box.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Whole row clickable */}
                <Link href={`/product/${box.id}`} className="flex flex-col sm:flex-row">
                  <div className="relative sm:w-48 h-48 flex-shrink-0">
                    <img src={box.image} alt={box.name} className="w-full h-full object-cover" />

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

                        <h3 className="text-xl font-bold text-slate-900 mb-2">{box.name}</h3>

                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-sm text-blue-600 font-medium">{box.category}</span>
                          <span className="text-sm text-slate-600">{box.ageRange}</span>
                        </div>

                        <p className="text-slate-600 leading-relaxed">{box.description}</p>
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

                {/* Actions outside of Link; prevent navigation */}
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
                      // add-to-cart logic here
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

        {/* Empty state */}
        {filteredAndSortedBoxes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuSearch className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No baby gift boxes found
            </h3>
            <p className="text-slate-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedAge('all');
                setSortBy('featured');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BabyGiftBoxesPage;

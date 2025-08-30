'use client';
import React, { useState } from 'react';
import { LuGift, LuHeart, LuShoppingCart, LuSparkles, LuStar } from 'react-icons/lu';

interface GiftBox {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
  isWishlisted: boolean;
  isSoldOut?: boolean;
}

export const KidsGiftBoxSection: React.FC = () => {
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([]);

  const giftBoxes: GiftBox[] = [
    {
      id: 1,
      name: "Epic Squishmallow Fun",
      price: 39.95,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 124,
      description: "Adorable squishmallow collection with unicorn themes",
      isWishlisted: false,
      badge: "Popular"
    },
    {
      id: 2,
      name: "Movie Munchie Treats",
      price: 49.95,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      reviews: 89,
      description: "Cinema snacks and treats for movie night fun",
      isWishlisted: false,
      isSoldOut: true,
      badge: "Sold Out"
    },
    {
      id: 3,
      name: "Blush Pink Bunny",
      price: 39.95,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 156,
      description: "Cuddly pink bunny with soft plush material",
      isWishlisted: false,
      badge: "Best Seller"
    },
    {
      id: 4,
      name: "Let's Play!",
      price: 79.95,
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviews: 203,
      description: "Adventure-packed toy collection for active play",
      isWishlisted: false,
      badge: "Premium"
    },
    {
      id: 5,
      name: "Creative Art Studio",
      price: 59.95,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 178,
      description: "Complete art supplies for budding artists",
      isWishlisted: false,
      badge: "New"
    },
    {
      id: 6,
      name: "Science Explorer Kit",
      price: 69.95,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 267,
      description: "Educational experiments and discovery tools",
      isWishlisted: false,
      badge: "Educational"
    }
  ];

  const toggleWishlist = (id: number) => {
    setWishlistedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Popular': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Best Seller': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Premium': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'New': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Educational': return 'bg-gradient-to-r from-indigo-500 to-purple-500';
      case 'Sold Out': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      default: return 'bg-gradient-to-r from-pink-500 to-rose-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <LuSparkles className="w-64 h-64 text-purple-500 animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <LuGift className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600 tracking-wider uppercase">
                Kids Collection
              </span>
              <LuGift className="w-8 h-8 text-purple-600" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Epic Kids Gift Box Range
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover magical moments with our carefully curated collection of premium gift boxes designed to spark joy and imagination
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <LuStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>Premium Quality</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <LuGift className="w-4 h-4 text-purple-500" />
                <span>Curated Selection</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <LuHeart className="w-4 h-4 text-red-500" />
                <span>Kids Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {giftBoxes.map((box, index) => (
            <div
              key={box.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              {box.badge && (
                <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-white text-xs font-bold ${getBadgeColor(box.badge)} shadow-lg`}>
                  {box.badge}
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(box.id)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-lg group-hover:scale-110"
              >
                <LuHeart
                  className={`w-5 h-5 transition-colors duration-200 ${wishlistedItems.includes(box.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 hover:text-red-500'
                    }`}
                />
              </button>

              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 p-8">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {box.isSoldOut && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-3xl">
                    <span className="text-white font-bold text-lg">Sold Out</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
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
                  <span className="text-sm text-gray-500">({box.reviews})</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                  {box.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 overflow-hidden">
                  {box.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${box.price}
                  </span>

                  <button
                    disabled={box.isSoldOut}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105
                      ${box.isSoldOut
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    <LuShoppingCart className="w-4 h-4" />
                    {box.isSoldOut ? 'Sold Out' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              <LuGift className="w-6 h-6" />
              Shop All Gift Boxes
              <LuSparkles className="w-5 h-5 animate-spin" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <p className="text-gray-500 mt-4 text-sm">
            Free shipping on orders over $75 • 30-day returns • Kid-tested & approved
          </p>
        </div>
      </div>
    </div>
  );
};
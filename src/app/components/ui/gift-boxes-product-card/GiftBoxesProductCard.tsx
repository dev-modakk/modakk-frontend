'use client';
import { GIFT_BOXES_PRODUCT_RESPONSE } from "@/app/mocks"
import { getBadgeColor } from "@/app/utils";
import { useState } from "react";
import { LuHeart, LuShoppingCart, LuStar } from "react-icons/lu"

export const GiftBoxesProductCard = () => {
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlistedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
      {GIFT_BOXES_PRODUCT_RESPONSE.map((box) => (
        <div
          key={box.id}
          className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-300 overflow-hidden"
        >
          {box.badge && (
            <div className={`absolute top-4 left-4 z-10 px-4 py-2 rounded-lg text-white text-sm font-bold ${getBadgeColor(box.badge)} shadow-md`}>
              {box.badge}
            </div>
          )}

          <button
            onClick={() => toggleWishlist(box.id)}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg border-2 border-gray-200"
          >
            <LuHeart
              className={`w-5 h-5 transition-colors duration-200 ${wishlistedItems.includes(box.id)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
                }`}
            />
          </button>

          <div className="relative">
            <div className="aspect-square bg-gray-100 p-6">
              <img
                src={box.image}
                alt={box.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {box.isSoldOut && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                <span className="text-white font-medium">Sold Out</span>
              </div>
            )}
          </div>

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

            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {box.name}
            </h3>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {box.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-gray-900">
                ${box.price}
              </span>

              <button
                disabled={box.isSoldOut}
                className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200
                          ${box.isSoldOut
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
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
  )
}
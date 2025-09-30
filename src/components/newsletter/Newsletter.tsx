import { useState } from "react";
import { LuArrowRight, LuGift, LuHeart, LuShield, LuStar } from "react-icons/lu"

export const Newsletter = () => {
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
  return (
    <div className="border-b border-gray-200 pb-8 sm:pb-12 md:pb-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <LuGift className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-xs sm:text-sm">
            Stay Connected
          </span>
          <LuGift className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900 leading-tight">
          Get Epic Updates!
        </h2>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
          Be the first to know about new gift boxes, exclusive offers, and magical surprises for your little ones
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={isSubscribed}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 flex items-center gap-2 justify-center text-sm sm:text-base"
          >
            {isSubscribed ? (
              <>
                <LuHeart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                Subscribed!
              </>
            ) : (
              <>
                Subscribe
                <LuArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <LuShield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <LuGift className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span>Exclusive offers</span>
          </div>
          <div className="flex items-center gap-2">
            <LuStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            <span>Early access</span>
          </div>
        </div>
      </div>
    </div>
  )
}
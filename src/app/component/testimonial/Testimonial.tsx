'use client';
import React, { useState, useEffect } from 'react';
import { LuChevronLeft, LuChevronRight, LuGift, LuHeart, LuQuote, LuStar } from 'react-icons/lu';


interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  avatar: string;
  location: string;
  product: string;
  date: string;
}

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Phoebe A.",
      review: "We loved the Pokémon gift pack, such a fun selection of treats and a joy to see the delight on Mr 8.5's face as he explored the goodies. Thanks Epic Kids! 🙌",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Sydney, Australia",
      product: "Pokémon Adventure Box",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Chane C.",
      review: "I would just like to say, thank you so much for my daughters two beautiful boxes! The quality and presentation exceeded our expectations.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Melbourne, Australia",
      product: "Princess Dreams Collection",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Victoria S.",
      review: "Very cool, great gifts, awesome packaging and card, what a great business! My kids absolutely love everything that came in their surprise boxes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Brisbane, Australia",
      product: "Surprise Mystery Box",
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Nadia J.",
      review: "Thank you so much! We really appreciate the service you provide and our recipient was super happy and delighted with her gift box! Being able to send Squishmallows is amazing as they're so popular but hard to organise as a gift when sending from afar, so thanks again so much! We'd happily be a returning customer :)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Perth, Australia",
      product: "Squishmallow Deluxe Box",
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Marcus T.",
      review: "Absolutely fantastic service! The kids were thrilled with their LEGO adventure box. Fast delivery and beautiful packaging made this the perfect gift solution.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Adelaide, Australia",
      product: "LEGO Adventure Box",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Sarah K.",
      review: "Epic Kids has made gift-giving so easy! The art supplies box was perfectly curated and my daughter spent hours creating masterpieces. Highly recommend!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Darwin, Australia",
      product: "Creative Art Studio",
      date: "4 days ago"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <LuStar
        key={i}
        className={`w-5 h-5 ${i < rating
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <LuQuote className="w-64 h-64 text-purple-500" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <LuHeart className="w-6 h-6 text-pink-500 animate-pulse" />
              <span className="text-sm font-semibold text-purple-600 tracking-wider uppercase">
                Customer Love
              </span>
              <LuHeart className="w-6 h-6 text-pink-500 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              What Our Customers Are Saying
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Don't just take our word for it - hear from the families who've experienced the magic of our gift boxes
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(5)}
                </div>
                <span className="font-semibold">4.9/5 Average Rating</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <LuGift className="w-4 h-4 text-purple-500" />
                <span>1000+ Happy Families</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div
            className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10">
              {/* Quote Icon */}
              <LuQuote className="w-12 h-12 text-purple-300 mb-6" />

              {/* Review Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8 min-h-32">
                "{testimonials[currentIndex].review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-lg text-gray-800">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonials[currentIndex].location}
                    </div>
                    <div className="text-purple-600 text-sm font-medium">
                      {testimonials[currentIndex].product}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex mb-2">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonials[currentIndex].date}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <LuChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <LuChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                ? 'bg-purple-600 scale-125'
                : 'bg-gray-300 hover:bg-purple-300'
                }`}
            />
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50"
            >
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-gray-700 mb-4 text-sm leading-relaxed overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical'
              }}>
                "{testimonial.review}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-90">Happy Families</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24h</div>
              <div className="text-sm opacity-90">Fast Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
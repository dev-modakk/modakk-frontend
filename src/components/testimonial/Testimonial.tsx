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
      review: "We loved the Pokémon gift pack, such a fun selection of treats and a joy to see the delight on Mr 8.5's face as he explored the goodies. Thanks Modakk! 🙌",
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
      review: "Modakk has made gift-giving so easy! The art supplies box was perfectly curated and my daughter spent hours creating masterpieces. Highly recommend!",
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
        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <LuQuote className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 text-blue-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <LuHeart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-blue-600 tracking-wider uppercase">
                  Customer Love
                </span>
                <LuHeart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500 animate-pulse" />
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 text-gray-900 leading-tight">
                What Our Customers Are Saying
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
                Don't just take our word for it - hear from the families who've experienced the magic of our gift boxes
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(5)}
                  </div>
                  <span className="font-semibold">4.9/5 Average Rating</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <LuGift className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  <span>1000+ Happy Families</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto mb-8 sm:mb-12">
            <div
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-300 overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>

              <div className="relative z-10">
                <LuQuote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-300 mb-4 sm:mb-6" />

                <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 font-medium leading-relaxed mb-6 sm:mb-8 min-h-[4rem] sm:min-h-[6rem] md:min-h-[8rem]">
                  "{testimonials[currentIndex].review}"
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-sm sm:text-base md:text-lg text-gray-800">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm">
                        {testimonials[currentIndex].location}
                      </div>
                      <div className="text-blue-600 text-xs sm:text-sm font-medium">
                        {testimonials[currentIndex].product}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="flex mb-1 sm:mb-2 justify-start sm:justify-end">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {testimonials[currentIndex].date}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 sm:-translate-x-full bg-white/90 hover:bg-white text-blue-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <LuChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 sm:translate-x-full bg-white/90 hover:bg-white text-blue-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <LuChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-purple-300'
                  }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-300 overflow-hidden p-4 sm:p-6"
              >
                <div className="flex mb-3 sm:mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical'
                }}>
                  "{testimonial.review}"
                </p>

                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-xs sm:text-sm text-gray-800">
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
        </div>
      </div>
    </div>
  );
};
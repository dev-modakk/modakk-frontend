'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { ImageCarouselProps } from './ImageCarouselProps.interface';
import { useCarouselQuery } from '@/query-hooks';

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { data: apiImages, isLoading, error } = useCarouselQuery();

  const carouselImages = Array.isArray(apiImages) ? apiImages : (images || []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? carouselImages.length - 1 : prev - 1);
  }, [carouselImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => prev === carouselImages.length - 1 ? 0 : prev + 1);
  }, [carouselImages.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [carouselImages]);

  useEffect(() => {
    if (!isAutoPlaying || carouselImages.length === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoplayInterval, goToNext, carouselImages.length]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevious, goToNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  if (isLoading) {
    return (
      <div className="relative w-full max-w-7xl mx-auto bg-gray-200 rounded-lg overflow-hidden shadow-2xl h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full max-w-7xl mx-auto bg-gray-200 rounded-lg overflow-hidden shadow-2xl h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center">
        <p className="text-gray-500">Failed to load carousel images</p>
      </div>
    );
  }

  if (!carouselImages || carouselImages.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }
  console.log({ carouselImages })
  return (
    <div
      className={`relative w-full max-w-6xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {(image.title || image.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  {image.title && (
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                      {image.title}
                    </h3>
                  )}
                  {image.description && (
                    <p className="text-white/90 text-sm md:text-base">
                      {image.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showArrows && carouselImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <LuChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <LuChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {showDots && carouselImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
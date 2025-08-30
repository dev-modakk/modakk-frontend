import { ImageCarousel } from "./ImageCarousel.interface";

export interface ImageCarouselProps {
  images: ImageCarousel[];
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}
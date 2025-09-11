export interface KidsGiftBoxResponse {
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

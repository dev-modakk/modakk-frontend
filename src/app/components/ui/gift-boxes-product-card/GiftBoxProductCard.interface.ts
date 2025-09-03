export interface GiftBoxProductCard {
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
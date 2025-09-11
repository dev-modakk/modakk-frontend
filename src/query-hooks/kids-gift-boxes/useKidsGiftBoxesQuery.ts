import { KidsGiftBoxResponse } from '@/server';
import { getAllKidsGiftBoxes } from '@/service';
import { fetchKidsGiftBoxes } from '@/service/kids-gift-boxes/kidsGiftBoxes.service';
import { useQuery } from '@tanstack/react-query';

// Interface for query parameters
interface KidsGiftBoxesQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  ageRange?: string;
  search?: string;
  sortBy?: string;
}

export const useKidsGiftBoxesQuery = (params: KidsGiftBoxesQueryParams = {}) => {
  const { page = 1, limit = 10, category, ageRange, search, sortBy } = params;

  return useQuery({
    queryKey: ['kidsGiftBoxes', page, limit, category, ageRange, search, sortBy],
    queryFn: () => fetchKidsGiftBoxes(page, limit, { category, ageRange, search, sortBy }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// For homepage section - get only featured items
export const useKidsGiftBoxesHomepage = () => {
  return useQuery({
    queryKey: ['kidsGiftBoxes', 'homepage'],
    queryFn: () => fetchKidsGiftBoxes(1, 6),
    staleTime: 10 * 60 * 1000, // 10 minutes - longer for homepage
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    select: (data) => {
      // Transform and limit to 3 items for homepage
      if (data?.items) {
        return data.items.slice(0, 3);
      }
      return data?.slice(0, 3) || [];
    }
  });
};
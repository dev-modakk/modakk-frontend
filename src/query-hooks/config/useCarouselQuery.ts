import { fetchCarouselImages } from '@/service';
import { useQuery } from '@tanstack/react-query';


export const useCarouselQuery = () => {
  return useQuery({
    queryKey: ['carousel', 'images'],
    queryFn: fetchCarouselImages,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/service/product/product.service';

export const useProductQuery = (displayId: string) => {
  return useQuery({
    queryKey: ['product', displayId],
    queryFn: () => fetchProductById(displayId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!displayId, // Only run if displayId is provided
  });
};

import { useMemo } from 'react';
import { useKidsGiftBoxesQuery } from '../query-hooks';
import { useKidsGiftBoxesStore } from '../store';

export const useKidsGiftBoxes = () => {
  const { searchQuery, selectedCategory, selectedAge, sortBy, ...uiState } = useKidsGiftBoxesStore();

  // Use the API query with filters and pagination
  const { data: apiResponse, isLoading, error } = useKidsGiftBoxesQuery({
    page: uiState.currentPage,
    limit: uiState.pageSize,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    ageRange: selectedAge !== 'all' ? selectedAge : undefined,
    search: searchQuery || undefined,
    sortBy: sortBy || undefined
  });

  // Extract items from the paginated API response and apply client-side sorting as fallback
  const giftBoxes = useMemo(() => {
    const items = apiResponse?.items || [];

    // Apply client-side sorting if needed (fallback if API sorting doesn't work)
    if (items.length > 0 && sortBy) {
      const sortedItems = [...items];

      switch (sortBy) {
        case 'price-low':
          return sortedItems.sort((a, b) => a.price - b.price);
        case 'price-high':
          return sortedItems.sort((a, b) => b.price - a.price);
        case 'name':
          return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
          return sortedItems.sort((a, b) => b.rating - a.rating);
        case 'featured':
        case 'newest':
        default:
          return items; // Keep original order
      }
    }

    return items;
  }, [apiResponse?.items, sortBy]);

  const totalItems = apiResponse?.total || 0;
  const totalPages = apiResponse?.totalPages || 1;
  const hasNextPage = uiState.currentPage < totalPages;
  const hasPrevPage = uiState.currentPage > 1;

  return {
    giftBoxes,
    allGiftBoxes: giftBoxes,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    selectedAge,
    sortBy,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
    ...uiState
  };
};

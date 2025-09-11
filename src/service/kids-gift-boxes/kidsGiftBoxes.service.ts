import { apiClient } from "@/network";
const BASE_URL = '/kidsgiftboxes';

interface FetchKidsGiftBoxesFilters {
  category?: string;
  ageRange?: string;
  search?: string;
  sortBy?: string;
}

export const fetchKidsGiftBoxes = async (
  page: number = 1,
  pageSize: number = 10,
  filters: FetchKidsGiftBoxesFilters = {}
) => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    // Add filters if provided
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters.ageRange && filters.ageRange !== 'all') {
      params.append('ageRange', filters.ageRange);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.sortBy) {
      params.append('sortBy', filters.sortBy);
    }

    const queryString = params.toString();
    console.log('Fetching kids gift boxes from:', `${BASE_URL}?${queryString}`);

    const response = await apiClient.get(`${BASE_URL}?${queryString}`);
    console.log('API Response:', response.data);

    // Return the full response object for pagination
    if (response.data.items) {
      const items = response.data.items || [];
      const transformedItems = items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.priceInINR),
        originalPrice: undefined, // Not provided by API
        rating: parseFloat(item.rating),
        reviews: item.reviews,
        image: item.image,
        category: item.category === 'GB' ? 'Gift Boxes' : item.category === 'TY' ? 'Toys' : item.category,
        ageRange: '3-12 years', // Default since not provided by API
        description: item.description,
        badge: item.badge,
        inStock: !item.isSoldOut,
        featured: item.badge === 'Best Seller',
      }));

      console.log('Transformed items:', transformedItems);

      return {
        items: transformedItems,
        page: response.data.page,
        pageSize: response.data.pageSize,
        total: response.data.total,
        totalPages: response.data.totalPages
      };
    }

    // Fallback for non-paginated response
    return response.data;
  } catch (error) {
    console.error('Error fetching kids gift boxes:', error);
    throw error;
  }
};

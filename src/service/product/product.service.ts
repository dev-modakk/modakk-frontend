import { apiClient } from "@/network";

const BASE_URL = '/kidsgiftboxes';

export const fetchProductById = async (displayId: string) => {
  try {
    console.log('Fetching product by displayId:', displayId);
    const response = await apiClient.get(`${BASE_URL}/${displayId}`);
    console.log('Product API Response:', response.data);

    // Transform the API response to match our frontend interface
    const product = response.data;
    console.log('Transformed Product:', product);
    return {
      id: product.displayId, // Use displayId as the main identifier
      name: product.name,
      price: parseFloat(product.priceInINR),
      originalPrice: product.originalPriceInINR ? parseFloat(product.originalPriceInINR) : undefined,
      rating: parseFloat(product.rating),
      reviews: product.reviews,
      images: product.images || [product.image], // Use images array or fallback to single image
      category: product.category === 'GB' ? 'Gift Boxes' : product.category === 'TY' ? 'Toys' : product.category,
      ageRange: product.ageRange || '3-12 years', // Default if not provided
      description: product.description,
      badge: product.badge,
      inStock: !product.isSoldOut,
      featured: product.badge === 'Best Seller',
      features: product.features || [],
      whatsIncluded: product.whatsIncluded || []
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

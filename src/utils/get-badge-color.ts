const BADGE_COLORS = {
  'Popular': 'bg-blue-600 text-white',
  'New': 'bg-green-600 text-white',
  'New Arrival': 'bg-green-600 text-white',
  'Bestseller': 'bg-purple-600 text-white',
  'Best Seller': 'bg-purple-600 text-white',
  'Limited': 'bg-red-600 text-white',
  'Premium': 'bg-yellow-600 text-white',
  'Educational': 'bg-indigo-600 text-white',
  'Sold Out': 'bg-gray-500 text-white',
} as const;

export const getBadgeColor = (badge: string): string => {
  const normalizedBadge = badge?.trim();
  return BADGE_COLORS[normalizedBadge as keyof typeof BADGE_COLORS] || 'bg-gray-600 text-white';
};

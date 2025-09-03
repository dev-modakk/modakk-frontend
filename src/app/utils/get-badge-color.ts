export const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'Popular': return 'bg-purple-500';
    case 'Best Seller': return 'bg-green-500';
    case 'Premium': return 'bg-yellow-500';
    case 'New': return 'bg-blue-500';
    case 'Educational': return 'bg-indigo-500';
    case 'Sold Out': return 'bg-gray-500';
    default: return 'bg-pink-500';
  }
};

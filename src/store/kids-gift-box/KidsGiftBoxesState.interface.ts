import { KidsGiftBoxResponse } from "@/server";

export interface KidsGiftBoxResponsesState {
  giftBoxes: KidsGiftBoxResponse[];
  filteredGiftBoxes: KidsGiftBoxResponse[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedAge: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
  showFilters: boolean;
  wishlistedItems: string[];
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
  setGiftBoxes: (boxes: KidsGiftBoxResponse[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedAge: (age: string) => void;
  setSortBy: (sort: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setShowFilters: (show: boolean) => void;
  toggleWishlist: (id: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  fetchGiftBoxes: (page?: number, pageSize?: number) => Promise<void>;
  // Pagination methods
  setCurrentPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setPaginationData: (data: { page: number; pageSize: number; total: number; totalPages: number }) => void;
}
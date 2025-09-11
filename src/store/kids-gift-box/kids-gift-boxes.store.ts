
import { create } from 'zustand';

// Simplified interface for UI state only
interface KidsGiftBoxesUIState {
  // Search and filters
  searchQuery: string;
  selectedCategory: string;
  selectedAge: string;
  sortBy: string;

  // UI state
  viewMode: 'grid' | 'list';
  showFilters: boolean;
  wishlistedItems: string[];

  // Pagination state (React Query handles the data)
  currentPage: number;
  pageSize: number;

  // Actions for search and filters
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedAge: (age: string) => void;
  setSortBy: (sort: string) => void;
  clearFilters: () => void;

  // Actions for UI state
  setViewMode: (mode: 'grid' | 'list') => void;
  setShowFilters: (show: boolean) => void;
  toggleWishlist: (id: string) => void;

  // Actions for pagination
  setCurrentPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useKidsGiftBoxesStore = create<KidsGiftBoxesUIState>((set) => ({
  // Search and filters
  searchQuery: '',
  selectedCategory: 'all',
  selectedAge: 'all',
  sortBy: 'featured',

  // UI state
  viewMode: 'grid',
  showFilters: false,
  wishlistedItems: [],

  // Pagination state
  currentPage: 1,
  pageSize: 10,

  // Actions for search and filters
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedAge: (age) => set({ selectedAge: age }),
  setSortBy: (sort) => set({ sortBy: sort }),

  clearFilters: () => set({
    searchQuery: '',
    selectedCategory: 'all',
    selectedAge: 'all',
    sortBy: 'featured'
  }),

  // Actions for UI state
  setViewMode: (mode) => set({ viewMode: mode }),
  setShowFilters: (show) => set({ showFilters: show }),

  toggleWishlist: (id) => set((state) => ({
    wishlistedItems: state.wishlistedItems.includes(id)
      ? state.wishlistedItems.filter(item => item !== id)
      : [...state.wishlistedItems, id]
  })),

  // Actions for pagination
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (pageSize) => set({ pageSize, currentPage: 1 })
}));
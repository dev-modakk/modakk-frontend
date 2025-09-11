import { useEffect } from 'react';
import { useKidsGiftBoxesQuery } from '../query-hooks';
import { useKidsGiftBoxesStore } from '../store';

export const useKidsGiftBoxes = () => {
  const { data, isLoading, error } = useKidsGiftBoxesQuery();
  const { setGiftBoxes, filteredGiftBoxes, ...store } = useKidsGiftBoxesStore();

  useEffect(() => {
    if (data) {
      setGiftBoxes(data);
    }
  }, [data, setGiftBoxes]);

  return {
    giftBoxes: filteredGiftBoxes,
    isLoading,
    error,
    ...store
  };
};
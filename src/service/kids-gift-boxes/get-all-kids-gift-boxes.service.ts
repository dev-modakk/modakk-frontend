import { apiClient } from '@/network';
import { KidsGiftBoxResponse } from '@/server';
import axios from 'axios';

export const getAllKidsGiftBoxes = async (): Promise<KidsGiftBoxResponse[]> => {
  try {
    const response = await apiClient.get<KidsGiftBoxResponse[]>('/kidsgiftboxes');
    return response.data;

  } catch (error) {
    console.error('Error fetching kids gift boxes:', error);

    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch kids gift boxes: ${error.response?.status} ${error.message}`);
    }

    throw new Error('Failed to fetch kids gift boxes');
  }
};
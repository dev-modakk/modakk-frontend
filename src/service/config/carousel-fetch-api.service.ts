import { CarouselApiResponse } from "./CarouselApiResponse.interface";
import axios from "axios";

const API_BASE_URL = 'http://localhost:3001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCarouselImages = async (): Promise<CarouselApiResponse[]> => {
  try {
    console.log('Fetching carousel images from API...');

    const response = await apiClient.get('/config/carousel');
    console.log('Carousel images fetched:', response.data);
    return response.data.slides || [];

  } catch (error) {
    console.error('Error fetching carousel images:', error);

    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch carousel images: ${error.response?.status} ${error.message}`);
    }

    throw new Error('Failed to fetch carousel images');
  }
};
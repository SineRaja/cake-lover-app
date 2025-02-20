import axios from 'axios';
import { API_ENDPOINTS, DEFAULT_HEADERS } from '@/config/api';
import { Cake, CakeFormData } from '@/types/cake';

const api = axios.create({
  headers: DEFAULT_HEADERS,
});

export const cakeService = {
  // Get all cakes
  getAllCakes: async (): Promise<Cake[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.CAKES);
      return response.data;
    } catch (error) {
      console.error('Error fetching cakes:', error);
      throw error;
    }
  },

  // Get cake by ID
  getCakeById: async (id: string): Promise<Cake> => {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid cake ID');
    }
    try {
      const response = await api.get(`${API_ENDPOINTS.CAKES}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cake with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new cake
  createCake: async (cakeData: CakeFormData): Promise<Cake> => {
    try {
      const response = await api.post(API_ENDPOINTS.CAKES, cakeData);
      return response.data;
    } catch (error) {
      console.error('Error creating cake:', error);
      throw error;
    }
  },

  // Update a cake
  updateCake: async (id: string, cakeData: CakeFormData): Promise<Cake> => {
    try {
      const response = await api.put(`${API_ENDPOINTS.CAKES}/${id}`, cakeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating cake with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a cake
  deleteCake: async (id: string): Promise<void> => {
    try {
      await api.delete(`${API_ENDPOINTS.CAKES}/${id}`);
    } catch (error) {
      console.error(`Error deleting cake with ID ${id}:`, error);
      throw error;
    }
  },
};
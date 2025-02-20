import { create } from 'zustand';
import { cakeService } from '@/services/cakeService';
import { Cake, CakeFormData } from '@/types/cake';

interface CakeState {
  cakes: Cake[];
  selectedCake: Cake | null;
  loading: boolean;
  error: string | null;
  fetchCakes: () => Promise<void>;
  fetchCakeById: (id: string) => Promise<void>;
  addCake: (cake: CakeFormData) => Promise<void>;
  updateCake: (id: string, cake: CakeFormData) => Promise<void>; // ✅ Changed `id` to string
  deleteCake: (id: string) => Promise<void>;
}

export const useCakeStore = create<CakeState>((set) => ({
  cakes: [],
  selectedCake: null,
  loading: false,
  error: null,

  fetchCakes: async () => {
    set({ loading: true, error: null });
    try {
      const cakes = await cakeService.getAllCakes();
      set({ cakes, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch cakes',
        loading: false
      });
    }
  },

  fetchCakeById: async (id: string) => { // ✅ Ensure ID is a string
    set({ loading: true, error: null });
    try {
      const cake = await cakeService.getCakeById(id);
      set({ selectedCake: cake, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : `Failed to fetch cake with ID ${id}`,
        loading: false
      });
    }
  },

  addCake: async (cakeData: CakeFormData) => {
    set({ loading: true, error: null });
    try {
      const newCake = await cakeService.createCake(cakeData);
      set((state) => ({ 
        cakes: [...state.cakes, newCake],
        loading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add cake',
        loading: false
      });
    }
  },

  updateCake: async (id: string, cakeData: CakeFormData) => { // ✅ Changed `id` to string
    set({ loading: true, error: null });
    try {
      const updatedCake = await cakeService.updateCake(id, cakeData);
      set((state) => ({
        cakes: state.cakes.map((cake) => cake._id === id ? updatedCake : cake), // ✅ Ensure `_id` is a string
        selectedCake: updatedCake,
        loading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : `Failed to update cake with ID ${id}`,
        loading: false
      });
    }
  },

  deleteCake: async (id: string) => { // ✅ Pass `id` directly as a string
    set({ loading: true, error: null });
    try {
      await cakeService.deleteCake(id); // ✅ Remove `parseInt(id)`
      set((state) => ({
        cakes: state.cakes.filter((cake) => cake._id !== id), // ✅ Use `_id` (string) directly
        loading: false
      }));
    } catch (error) {
      set({
        error: `Failed to delete cake with ID ${id} as got ${error} `,
        loading: false
      });
    }
  },
}));

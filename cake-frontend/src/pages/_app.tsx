/**
 * App.tsx - Global Application Wrapper
 * 
 * @fileoverview
 * - This is the main entry point for the Next.js application.
 * - It wraps every page with common functionalities such as toast notifications and global state management.
 * - Fetches the list of cakes on initial app load using Zustand.
 *
 * @optimizations
 * - **Performance:** The `fetchCakes` call can be optimized by:
 *   - Memoizing API calls (to avoid unnecessary re-fetching)
 *   - Implementing caching with SWR or React Query
 *   - Using pagination or lazy loading (for large datasets)
 *
 * @dependencies
 * - Zustand (`useCakeStore`) for state management
 * - React Hot Toast for user notifications
 * - Global CSS import for styling
 */

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { useEffect, useCallback } from 'react';
import { useCakeStore } from '@/store/cakeStore';

export default function App({ Component, pageProps }: AppProps) {
  
  // Memoize fetchCakes to avoid unnecessary re-renders
  const { fetchCakes } = useCakeStore();
  const fetchCakesMemoized = useCallback(() => {
    fetchCakes();
  }, [fetchCakes]);

  useEffect(() => {
    fetchCakesMemoized();
  }, [fetchCakesMemoized]);

  return (
    <>
      {/* Toast Notifications for User Feedback */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
          },
          success: {
            iconTheme: {
              primary: '#E91E63',
              secondary: '#fff',
            },
          },
        }}
      />
      {/* Render the current page */}
      <Component {...pageProps} />
    </>
  );
}

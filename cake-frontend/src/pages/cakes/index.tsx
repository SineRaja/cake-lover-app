/**
 * CakesListPage.tsx - Displays a list of all cakes
 *
 * @fileoverview
 * - This page fetches and displays a list of all cakes.
 * - Users can add new cakes and navigate to individual cake details.
 * - Handles loading, error states, and empty list cases.
 *
 * @optimizations
 * - **Pagination**: Implement pagination when the cake list grows to improve performance.
 * - **Memoization**: Wrap the mapped cakes inside `useMemo` to avoid unnecessary re-renders.
 * - **Lazy Loading**: Use lazy loading for images (`next/image` with `loading="lazy"`).
 * - **Skeleton UI**: Improve user experience by adding skeleton loaders instead of blank loading screens.
 *
 * @dependencies
 * - **Next.js** for routing and metadata management.
 * - **Zustand (`useCakeStore`)** for global state management.
 * - **Toast Notifications (`react-hot-toast`)** for feedback.
 */


import { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import CakeCard from '@/components/cards/CakeCard';
import { useCakeStore } from '@/store/cakeStore';

const CakesListPage: NextPage = () => {
  const { cakes, loading, error, fetchCakes } = useCakeStore();

  useEffect(() => {
    fetchCakes();
  }, [fetchCakes]);

  return (
    <>
      <Head>
        <title>All Cakes | Cake Lovers App</title>
        <meta name="description" content="Browse our collection of delicious cakes" />
      </Head>
      <Layout>
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tasty Cake Collection</h1>
            <p className="text-gray-600 mt-2">Browse and drool over these delicious cakes</p>
          </div>
          <Link
            href="/cakes/add"
            className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Cake
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button
              className="underline mt-2 text-red-800"
              onClick={() => fetchCakes()}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && cakes.length === 0 && (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm p-8">
            <svg 
              className="w-16 h-16 mx-auto text-pink-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-medium text-gray-600 mt-4 mb-2">No cakes found</h2>
            <p className="mb-6 text-gray-500">Be the first to add a delicious cake to our collection!</p>
            <Link
              href="/cakes/add"
              className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Your First Cake
            </Link>
          </div>
        )}

        {!loading && !error && cakes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cakes.map((cake) => (
              <CakeCard key={cake._id} cake={cake} />
            ))}
          </div>
        )}
      </Layout>
    </>
  );
};

export default CakesListPage;
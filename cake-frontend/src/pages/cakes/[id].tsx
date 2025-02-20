/**
 * CakeDetailPage.tsx - View a single cake's details
 *
 * @fileoverview
 * - Displays a single cake entry, including name, image, comment, and yum factor.
 * - Allows users to delete a cake.
 * - Redirects to `/cakes` after deletion.
 *
 * @optimizations
 * - Use **React.memo** for components that don’t require frequent updates.
 * - Implement **Skeleton UI** for smoother loading experience.
 *
 * @dependencies
 * - Next.js for routing
 * - Zustand (`useCakeStore`) for state management
 * - Toast notifications (`react-hot-toast`)
 */

import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useCakeStore } from '@/store/cakeStore';
import toast from 'react-hot-toast';

const CakeDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { selectedCake, loading, error, fetchCakeById, deleteCake } = useCakeStore();

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchCakeById(id);
    }
  }, [id, fetchCakeById]);

  const handleDelete = async () => {
    if (!selectedCake || !selectedCake._id) return;
    
    if (confirm('Are you sure you want to delete this cake?')) {
      try {
        await deleteCake(selectedCake._id);
        toast.success('Cake deleted successfully!');
        router.push('/cakes');
      } catch (error) {
        console.error('Error occurred:', error);
        toast.error('Failed to delete cake');
      }
    }
  };

  const handleGoBack = () => {
    router.push('/cakes');
  };

  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Loading Cake... | Cake Lovers App</title>
        </Head>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !selectedCake) {
    return (
      <Layout>
        <Head>
          <title>Cake Not Found | Cake Lovers App</title>
        </Head>
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
          <svg 
            className="w-16 h-16 mx-auto text-gray-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-medium text-gray-700 mt-4">Cake not found</h2>
          <p className="text-gray-500 mt-2">
            {error || "We couldn't find the cake you're looking for."}
          </p>
          <button
            className="mt-6 inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            onClick={handleGoBack}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to cakes
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{selectedCake.name} | Cake Lovers App</title>
        <meta name="description" content={`View details about ${selectedCake.name}`} />
      </Head>
      
      <button
        onClick={handleGoBack}
        className="mb-6 inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to all cakes
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 relative h-72 md:h-auto">
            <Image
              src={selectedCake.imageUrl}
              alt={selectedCake.name}
              fill
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedCake.name}</h1>
            </div>

            <div className="flex my-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${
                    i < selectedCake.yumFactor ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                Yum Factor: {selectedCake.yumFactor}/5
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Review</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700 whitespace-pre-line">{selectedCake.comment}</p>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => router.push(`/cakes/edit/${selectedCake._id}`)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CakeDetailPage;
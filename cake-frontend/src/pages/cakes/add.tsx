/**
 * AddCakePage.tsx - Add New Cake Page
 *
 * @fileoverview
 * - This page allows users to submit a new cake entry.
 * - Uses the `CakeForm` component for data input.
 * - Redirects back to `/cakes` after submission.
 *
 * @optimizations
 * - Ensure `onSubmit` is correctly passed to `CakeForm` to avoid errors.
 * - Consider adding a loading state to indicate submission progress.
 *
 * @dependencies
 * - Next.js for routing and meta details
 * - Zustand (`useCakeStore`) for state management
 */

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import CakeForm from '@/components/forms/CakeForm';
import { useCakeStore } from '@/store/cakeStore';
import toast from 'react-hot-toast';

const AddCakePage: NextPage = () => {
  const router = useRouter();
  const { addCake } = useCakeStore();

  const handleSubmit = async (data: CakeFormData) => {
    try {
      await addCake(data);
      toast.success('Cake added successfully!');
      router.push('/cakes');
    } catch (error) {
      toast.error('Failed to add cake');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add New Cake | Cake Lovers App</title>
        <meta name="description" content="Add a new cake to our collection" />
      </Head>

      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/cakes')}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to all cakes
        </button>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add a New Cake</h1>
            <p className="text-gray-600 mt-2">Share your favorite cake with the community</p>
          </div>

          <CakeForm onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default AddCakePage;

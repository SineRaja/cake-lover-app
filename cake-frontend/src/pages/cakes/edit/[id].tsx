import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { useCakeStore } from '@/store/cakeStore';
import CakeForm from '@/components/forms/CakeForm';
import { CakeFormData } from '@/types/cake';
import toast from 'react-hot-toast';

/**
 * @file EditCakePage.tsx
 * @description This page allows users to edit an existing cake.
 * It fetches cake details based on the ID from the URL and pre-fills the form.
 * Users can update cake details and submit the changes.
 */

const EditCakePage = () => {
  const router = useRouter();
  const { id } = router.query; // Extract cake ID from URL
  const { selectedCake, fetchCakeById, updateCake } = useCakeStore();
  const [formData, setFormData] = useState<CakeFormData | null>(null);

  /**
   * Fetch cake details when the page loads or when ID changes.
   */
  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchCakeById(id);
    }
  }, [fetchCakeById, id]);

  /**
   * Populate form data with the selected cake details.
   */
  useEffect(() => {
    if (selectedCake) {
      setFormData({
        _id: selectedCake._id,
        name: selectedCake.name,
        comment: selectedCake.comment,
        imageUrl: selectedCake.imageUrl,
        yumFactor: selectedCake.yumFactor,
      });
    }
  }, [selectedCake]);

  /**
   * Handles the form submission for updating a cake.
   * @param {CakeFormData} updatedCake - The updated cake details.
   */
  const handleSubmit = async (updatedCake: CakeFormData) => {
    if (!id || typeof id !== 'string') return;
    
    try {
      await updateCake(id, updatedCake);
      toast.success('Cake updated successfully!');
      router.push('/cakes'); // Redirect to the cakes list after update
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  /**
   * Show a loading spinner while waiting for cake details to be fetched.
   */
  if (!formData) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Edit {selectedCake?.name} | Cake Lovers App</title>
      </Head>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Cake</h1>
        <CakeForm initialData={formData} isEditing={true} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default EditCakePage;

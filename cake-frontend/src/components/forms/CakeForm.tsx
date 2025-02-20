import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { cakeSchema, CakeSchemaType } from '@/lib/validationSchema';
import { useCakeStore } from '@/store/cakeStore';
import { Cake,CakeFormData } from '@/types/cake';
import { AxiosError } from 'axios';

interface CakeFormProps {
  initialData?: Cake;
  isEditing?: boolean;
  onSubmit: (updatedCake: CakeFormData) => Promise<void>;  
}



const CakeForm: React.FC<CakeFormProps> = ({ 
  initialData,
  isEditing = false
}) => {
  const router = useRouter();
  const { addCake, updateCake } = useCakeStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError
  } = useForm<CakeSchemaType>({
    resolver: zodResolver(cakeSchema),
    defaultValues: initialData
  ? {
      name: initialData.name,
      comment: initialData.comment,
      imageUrl: initialData.imageUrl,
      yumFactor: initialData.yumFactor
    }
  : { 
      name: '',
      comment: '',
      imageUrl: '',
      yumFactor: 3
    },
  });

  const onSubmit = async (data: CakeSchemaType) => {
    console.log("Submitting Data: ", data); // Debugging log
    console.log("Is Editing: ", isEditing);
    console.log("Initial Cake ID: ", initialData?._id);
    try {
        if (isEditing && initialData?._id) {
            console.log("Updating cake...");
        await updateCake(initialData._id, data);
        toast.success('Cake updated successfully!');
      } else {
        console.log("Adding new cake...");
        await addCake(data);
        toast.success('Cake added successfully!');
      }
      router.push('/');
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 409) {
          // Handle duplicate cake name
          setError('name', {
            type: 'manual',
            message: 'A cake with this name already exists'
          });
        } else {
          toast.error('Something went wrong. Please try again.');
        }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {/* {isEditing ? 'Edit Cake' : 'Add New Cake'} */}
      </h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Cake Name
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-pink-500`}
          placeholder="Enter cake name"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.comment ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-pink-500`}
          placeholder="Your thoughts about this cake..."
          rows={4}
          {...register('comment')}
        />
        {errors.comment && (
          <p className="mt-1 text-red-500 text-sm">{errors.comment.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="text"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.imageUrl ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-pink-500`}
          placeholder="https://example.com/cake-image.jpg"
          {...register('imageUrl')}
        />
        {errors.imageUrl && (
          <p className="mt-1 text-red-500 text-sm">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="yumFactor" className="block text-gray-700 font-medium mb-2">
          Yum Factor (1-5)
        </label>
        <Controller
          name="yumFactor"
          control={control}
          render={({ field }) => (
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="mx-2 cursor-pointer">
                  <input
                    type="radio"
                    className="sr-only"
                    onChange={() => field.onChange(value)}
                    checked={field.value === value}
                  />
                  <svg
                    className={`w-8 h-8 ${
                      field.value >= value ? 'text-yellow-400' : 'text-gray-300'
                    } cursor-pointer`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </label>
              ))}
            </div>
          )}
        />
        {errors.yumFactor && (
          <p className="mt-1 text-red-500 text-sm">{errors.yumFactor.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => router.push('/')}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Cake' : 'Add Cake'}
        </button>
      </div>
    </form>
  );
};

export default CakeForm;
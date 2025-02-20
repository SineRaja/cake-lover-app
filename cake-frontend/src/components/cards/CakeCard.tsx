/**
 * @file CakeCard.tsx
 * @description This component represents a single cake card in the cake list.
 * It displays an image, name, and yum factor rating of a cake.
 * Clicking on the card navigates to the detailed view of the selected cake.
 *
 * @component
 * @param {Cake} cake - The cake object containing its details.
 *
 * @features
 * - Displays the cake's image in a responsive manner.
 * - Shows the cake name with text truncation for long names.
 * - Renders a star rating based on the cake's yum factor (1-5).
 * - Provides a hover effect for better user experience.
 * - Uses Next.js `Link` for optimized navigation.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cake } from '@/types/cake';

interface CakeCardProps {
  cake: Cake;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  return (
    <Link href={`/cakes/${cake._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer h-full flex flex-col">
        <div className="relative h-72 w-full">
          <Image
            src={cake.imageUrl}
            alt={cake.name}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading='lazy'
            unoptimized={false}
          />
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {cake.name}
          </h3>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < cake.yumFactor ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CakeCard;
/**
 * HomePage.tsx - Landing Page (Redirects to Cake Listing)
 * 
 * @fileoverview
 * - This is the main landing page of the application.
 * - Automatically redirects users to `/cakes`, where all cakes are listed.
 * - Uses Next.js' `useRouter` for client-side navigation.
 *
 * @optimizations
 * - **Performance:** 
 *   - Instead of `useEffect`, consider using Next.js' native redirect (`getServerSideProps`) for faster redirection.
 *   - If SEO is a priority, render some meaningful content instead of a blank loading spinner.
 *
 * @dependencies
 * - Next.js for page structure & routing
 * - Tailwind CSS for styling
 */

import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the cakes listing page on load
    router.push('/cakes');
  }, [router]);

  return (
    <>
      <Head>
        <title>Cake Lovers App</title>
        <meta name="description" content="Browse and share your favorite cakes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;

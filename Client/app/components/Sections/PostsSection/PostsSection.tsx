'use client';

import React, { useEffect, useState } from 'react';
import { findPost } from '../../../services/commonService';
import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from '../../Elements/PostCard/PostCard';

function PostsSection() {
  const [postsData, setPostsData] = useState<any[]>([]); // State to hold posts data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to track errors
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors before fetching
        const response = await findPost({isTrash: false}, 3); // Fetch posts with a limit of 3
        console.log('Response:', response);

        if (response.success && response.data?.length) {
          setPostsData(response.data); // Update state with fetched data
        } else {
          setError('No posts found.'); // Handle empty response
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('An error occurred while fetching posts.'); // Handle fetch errors
      } finally {
        setLoading(false); // Always hide the loading state
      }
    };

    fetchData();
  }, []); // Run only on initial component mount

  const handleLoadMore = () => {
    router.push(`/posts`);
  }

  return (
    <section
      id="posts"
      className="lg:w-[90%] m-auto lg:px-20 px-6 py-10 lg:py-20 w-full flex flex-col justify-center items-start gap-10"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-center items-start gap-4">
        <h1 data-aos="zoom-in" className="text-red-500 text-lg sm:text-xl lg:text-2xl aos-init aos-animate">
          POSTS
        </h1>
        <h1
          data-aos="zoom-in"
          className="text-black text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-snug mt-4 aos-init aos-animate"
        >
          Explore Posts
        </h1>
      </div>

      {/* posts Grid */}
      {loading ? (
        <p>Loading posts...</p> // Loading state
      ) : error ? (
        <p className='text-black'>{error}</p> // Error message
      ) : (
        <div
          id="grid-box"
          className="w-full"
        >
          {postsData.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      <button
        data-aos="zoom-in"
        data-aos-delay="400"
        className="bg-blue-600 text-md m-auto px-10 py-4 text-white font-semibold rounded-xl hover:bg-black dark:hover:bg-blue-700 cursor-pointer uppercase"
        onClick={handleLoadMore}
      >
        load more posts
      </button>
    </section>
  );
}

export default PostsSection;

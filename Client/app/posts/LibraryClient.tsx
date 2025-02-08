'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostCard from '@/app/components/Elements/PostCard/PostCard';
import { findPost } from '@/app/services/commonService';

export default function LibraryClient() {
    const [postsData, setPostData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await findPost({isTrash: false});
                console.log("response", response)
                if (response.success && response.data.length) {
                    // cachedPropertySlug = slug
                    setPostData(response.data);
                } else {
                    console.error('Failed to fetch posts.');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mx-auto px-4 py-4 min-h-[60vh]">
            <div className="container m-auto">
                {loading ? (
                    <div className="text-center py-10">Loading posts...</div>
                ) : postsData.length > 0 ? (
                    <>
                    <div className="w-full">
                        {postsData.map((post: any, index) => (
                            <PostCard key={index} post={post} />
                        ))}
                    </div>
                    </>
                ) : (
                    <div className="text-center py-10 text-gray-600 text-lg font-semibold">
                        No posts found.
                    </div>
                )}
            </div>
        </div>

    );
}

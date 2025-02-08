import React from 'react'
import { useRouter } from 'next/navigation';

function PostCard({ post }: any) {
    const router = useRouter();
    const handlePostClick = (post: any) => {
        router.push(`/post/${post.slug}`)
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
    }).format(new Date(post.publishedOn));
    return (
        <div className="flex flex-col lg:flex-row mb-6 border rounded-lg shadow-lg overflow-hidden" onClick={() => handlePostClick(post)}>
            <img src={post.postDetails.featuredImage} alt="Blog Image" className="w-full lg:w-1/3 h-full object-cover m-auto rounded-lg lg:rounded-l-lg cursor-pointer" />
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <p className="text-blue-600 text-sm font-medium cursor-pointer">Augmented reality</p>
                    <h2 className="text-xl font-bold mt-2 cursor-pointer text-black">{post.postDetails.title}</h2>
                    <p className="text-gray-600 mt-2 cursor-pointer">{post.postDetails.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm mt-4">{formattedDate}</p>
                    <p className="text-gray-500 text-sm mt-4">{post.publishedBy}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard
import React from 'react'
import { notFound } from 'next/navigation';
import { findPost } from '@/app/services/commonService';
import type { Metadata } from 'next';
import './post.scss';

async function fetchPostData(slug: string) {
    const response = await findPost({ slug }, 1);
    console.log("response", response)
    if (response.success && response.data.length) {
        // cachedPropertySlug = slug
        const post = response.data[0];
        return post;
    }
    else {
        return null;
    }
}

async function fetchMotePostData(query: any) {
    const response = await findPost(query, 6);
    console.log("response", response)
    if (response.success && response.data.length) {
        // cachedPropertySlug = slug
        const post = response.data;
        return post;
    }
    else {
        return null;
    }
}

function shortenString(str: string, size: number) {
    let subSrtingSize = size > 4 ? size - 3 : size;
    if (str.length > size) {
        return str.substring(0, subSrtingSize) + '...';
    }
    return str;
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;


    const post = await fetchPostData(slug);
    const morePosts: any = await fetchMotePostData({ slug: { "$ne": slug } })
    const isoDate = '2025-01-25T17:57:02.354Z';


    console.log("morePosts--", morePosts)
    console.log("post", post)
    if (!post) {
        notFound();
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
    }).format(new Date(isoDate));

    return (
        <>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Wrapper for the main content and sidebar */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Article Section */}
                    <article className="flex-1 bg-white shadow rounded p-6 sm:p-8 lg:p-12">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black post-title">{post.postDetails.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: post.postDetails.content || "<p>No content available.</p>",
                            }}
                            className="post"
                        />
                    </article>

                    {/* Sidebar Section */}

                    <aside className="w-full lg:w-1/3 bg-white p-4 sm:p-6 lg:p-8 shadow rounded">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-black">More Posts</h3>
                        {morePosts && morePosts.length ? (
                            <ul className="space-y-4">
                                {morePosts.map((post: any, index: number) => (
                                    <li key={index}>
                                        <a href={'https://landtreat.com/post/'+ post.slug} className="text-blue-600 hover:underline">
                                            {post.postDetails.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )
                            : (
                                <div className='text-black'>No More Posts Available</div>
                            )}

                    </aside>
                </div>
            </main>

        </>
    );
}

export default page
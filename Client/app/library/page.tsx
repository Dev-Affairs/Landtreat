import React, { Suspense } from 'react';
import LibraryClient from './LibraryClient'; // Client Component

export default function Library() {
    return (
        <div>
            <Suspense fallback={<div>Loading search results...</div>}>
                <LibraryClient />
            </Suspense>
        </div>
    );
}

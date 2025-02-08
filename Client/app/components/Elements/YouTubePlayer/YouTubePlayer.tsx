'use client';

import React from 'react'
import YouTube from 'react-youtube';
import { useRef, useState, useEffect } from 'react';

interface YouTubePlayerProps {
    videoId: string; // Video ID passed as a prop
}

export default function YouTubePlayer({ videoId }: YouTubePlayerProps) {
    const playerRef = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (playerRef.current) {
                const width = playerRef.current.offsetWidth;
                const height = (width * 9) / 16; // Maintain 16:9 aspect ratio
                setDimensions({ width, height });
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const opts = {
        height: dimensions.height.toString(),
        width: dimensions.width.toString(),
        playerVars: {
            autoplay: 0, // Auto-play the video
        },
    };

    const onPlayerReady = (event: any) => {
        console.log('Player is ready!');
    };

    return (
        <div ref={playerRef} style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
        </div>
    );
}

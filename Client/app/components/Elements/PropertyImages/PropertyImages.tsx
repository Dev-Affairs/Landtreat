'use client';

import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YouTubePlayer from '@/app/components/Elements/YouTubePlayer/YouTubePlayer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
function PropertyImages({ propertyDetails }: any) {
    const [currentImage, setCurrentImage] = useState({ src: propertyDetails.coverImage, index: 0, isVideo: false });
    const [youtubePlayerState, setYoutubePlayerState] = useState(false);
    const propertyImages = propertyDetails.propertyImages || []
    // const numberOfImages = propertyImages.length
    var showImagesNumber = 1
    //propertyImages.length > 3 ? (showImagesNumber = 4) : (showImagesNumber = propertyImages.length)
    var showMoreImages = propertyImages.length - showImagesNumber > 0

    const onClickListImage = (setEvent:any) => {
        setYoutubePlayerState(false);
        setCurrentImage(setEvent);
    }
    return (
        <>
            <div className="w-full lg:w-1/2 grid gap-2 aspect-video">
                <div className='border-[1px] border-[#e1e1e1] rounded-md h-[40vh]'>
                    {/* <Image src={currentImage.src} alt="Property Image" className="rounded-lg object-cover w-full" /> */}
                    {
                        youtubePlayerState ? (
                            <YouTubePlayer videoId={propertyDetails.featureYoutubeVideoId} />
                        ) : (
                            <img src={currentImage.src} alt="Property Image" className="rounded-lg object-cover w-full cursor-pointer h-full" />
                        )
                    }
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full h-[10vh]">
                    <>
                        {
                            propertyDetails.featureYoutubeVideo && (
                                <div className='rounded-lg flex items-center justify-center h-full w-auto border-[1px] border-[#e1e1e1] cursor-pointer relative aspect-video bg-black text-red-800 hover:text-red-600 text-2xl transition-all duration-300' onClick={() => setYoutubePlayerState(true)}>
                                    <FontAwesomeIcon icon={faYoutube} />
                                </div>
                            )
                        }
                    </>
                    <>
                        {[...Array(showImagesNumber)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 rounded-lg flex items-center justify-center h-full w-auto border-[1px] border-[#e1e1e1] cursor-pointer relative aspect-video"
                                onClick={() => onClickListImage({ src: propertyImages[index], index, isVideo: false })}
                            >
                                {index === showImagesNumber - 1 && showMoreImages && (
                                    <div className="absolute inset-0 bg-black opacity-50 rounded-md z-10 transition-all duration-300 group-hover:opacity-20 flex justify-center items-center">
                                        <FontAwesomeIcon icon={faPlus} /> {propertyImages.length - showImagesNumber}
                                    </div>
                                )}
                                <img
                                    src={propertyImages[index]}
                                    alt="Thumbnail"
                                    className="object-cover w-full h-full rounded-md"
                                />
                            </div>
                        ))}
                    </>
                </div>

            </div>
        </>
    )
}

export default PropertyImages
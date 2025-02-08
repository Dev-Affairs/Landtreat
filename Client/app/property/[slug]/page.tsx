import React from 'react'
import { notFound } from 'next/navigation';
import YouTubePlayer from '@/app/components/Elements/YouTubePlayer/YouTubePlayer';
import PropertyImages from '@/app/components/Elements/PropertyImages/PropertyImages';
import { findProperties } from '@/app/services/commonService';
import type { Metadata } from 'next';

type Props = {
    params: { slug: string };
};
  

let cachedProperty: any = null;
let cachedPropertySlug: any = null;
async function fetchPropertyData(slug: string) {
    if (cachedProperty && cachedPropertySlug == slug) {
        return cachedProperty; // Use cached data if available
    }

    const response = await findProperties({ slug }, 1);
    if (response.success && response.data.length) {
        cachedPropertySlug = slug
        cachedProperty = response.data[0];
        return cachedProperty;
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const { slug } = await params;
    const property = await fetchPropertyData(slug); // Fetch property details
    console.log("property", property)
    if (!property) {
        return {
            title: 'Property Not Found',
            description: 'The requested property could not be found.',
            keywords: ['property', 'real estate', 'not found'],
            other: {
                'geo.placename': 'India',
                'geo.country': 'in'
            },
        };
    }

    return {
        title: `${property.propertyDetails.propertyTitle} - Land Treat`,
        description: property.propertyDetails.propertyDescription ? shortenString(property.propertyDetails.propertyDescription, 150) : 'Find detailed information about this property.',
        keywords: property.propertyDetails.postTags || ['property', 'real estate', 'land treat'],
        alternates: {
            canonical: `https://landtreat.com/property/${slug || 'NotFound'}`,
        },
        other: {
            'geo.placename': 'India',
            'geo.country': 'in',
            'revisit-after': '1 days'
        },
        openGraph: {
            title: property.propertyDetails.propertyTitle,
            description: property.propertyDetails.propertyDescription ? shortenString(property.propertyDetails.propertyDescription, 150) : 'Find detailed information about this property.',
            url: `https://landtreat.com/property/${slug || 'NotFound'}`,
            type: 'website',
            siteName: 'Land Treat',
            images: [
              {
                url: property.propertyDetails.coverImage,
                width: 1200,
                height: 630,
                alt: property.propertyDetails.propertyTitle,
              }
            ],
          },
          themeColor: '#2f69e6',
    };
}

async function page({ params }: { params: Promise<{ slug: string }>}) {
    const { slug } = await params;


    const property = await fetchPropertyData(slug);
    if (!property) {
        notFound();
    }
    const propertyDetails = property.propertyDetails;
    const publishedDate = new Date(property.publishedOn);
    const fullDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(publishedDate);
    const shortTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(publishedDate);

    const propertyInfoSectionKeys = [
        { "text": "Type", "key": "propertyType" },
        { "text": "Category", "key": "category" },
        { "text": "Sub-Category", "key": "subCategory" },
        { "text": "City", "key": "city" },
        { "text": "Locality", "key": "locality" },
        { "text": "Address", "key": "address" },
        { "text": "Pincode", "key": "pincode" }
    ]




    return (
        <>
            <div className="container mx-auto px-4 py-6 grid gap-4">
                <div className="bg-white shadow-lg rounded-xl p-6 border-[1px] border-[#e1e1e1]">
                    <div className="flex flex-col lg:flex-row gap-6 h-[85%]">
                        <PropertyImages propertyDetails={propertyDetails} />

                        <div className="w-full lg:w-1/2 space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{propertyDetails.propertyTitle}</h2>
                            <div className="text-2xl font-bold text-gray-800">{propertyDetails.properyPriceInText}</div>
                            <div className="text-gray-700 text-sm">₹ {propertyDetails.landPricePerSqrft} per sqft</div>

                            <div className="bg-gray-100 p-4 rounded-lg  border-[1px] border-[#e1e1e1]">
                                {propertyDetails.Configurations && Array.isArray(propertyDetails.Configurations) && (
                                    <p className="text-gray-600"><strong>Configurations:</strong>{propertyDetails.Configurations.join(", ")}</p>
                                )}
                                <p className="text-gray-600"><strong>Posted On:</strong> {fullDate} at {shortTime}</p>
                                <p className="text-gray-600"><strong>Posted By:</strong> {property.publishedBy}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-gray-600">
                                {propertyInfoSectionKeys.map((item, index) => (
                                    propertyDetails[item.key] && (
                                        <div key={index}>
                                            <p><strong>{item.text}:</strong> {propertyDetails[item.key]}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white shadow-lg rounded-xl p-6 border-[1px] border-[#e1e1e1]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">More Details</h2>
                    <div className="space-y-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="font-semibold text-gray-700 w-1/4">Description</div>
                            <div className="text-gray-600 w-full lg:w-3/4">
                                {propertyDetails.propertyDescription}
                            </div>
                        </div>
                        {propertyDetails.nearByAreas && (
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="font-semibold text-gray-700 w-1/4">Nearby Area's</div>
                                <div className="text-gray-600 w-full lg:w-3/4">{propertyDetails.nearByAreas}</div>
                            </div>
                        )}
                        {propertyDetails.reraApproved && (
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="font-semibold text-gray-700 w-1/4">Rera Approved</div>
                                <div className="text-gray-600 w-full lg:w-3/4">{propertyDetails.reraApproved}</div>
                            </div>
                        )}
                        {propertyDetails.additionalFields && propertyDetails.additionalFields.length && (
                            propertyDetails.additionalFields.map((info: any, index: number) => (
                                <div className="flex flex-col lg:flex-row gap-4" key={index}>
                                    <div className="font-semibold text-gray-700 w-1/4">{info.label}</div>
                                    <div className="text-gray-600 w-full lg:w-3/4">{info.value}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

        </>
    );
}

export default page
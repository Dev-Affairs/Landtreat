'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropertyCard from '@/app/components/Elements/PropertyCard/PropertyCard';
import { findProperties } from '@/app/services/commonService';

export default function LibraryClient() {
    const searchParams = useSearchParams();
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    const [propertyData, setPropertyData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("query ---", city, type, category)
                let query: any = {}
                city && (query['propertyDetails.city'] = city)
                category && (query['propertyDetails.category'] = category)
                type && (query['propertyDetails.propertyType'] = type)
                const response = await findProperties(query);
                if (response.success) {
                    setPropertyData(response.data);
                } else {
                    console.error('Failed to fetch properties.');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city, type, category]);

    return (
        <div className="mx-auto px-4 py-4 min-h-[60vh]">
            <div className="container m-auto">
                {loading ? (
                    <div className="text-center py-10">Loading properties...</div>
                ) : propertyData.length > 0 ? (
                    <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-8">
                        {propertyData.map((property, index) => (
                            <PropertyCard key={index} propertyData={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-600 text-lg font-semibold">
                        No properties found.
                    </div>
                )}
            </div>
        </div>

    );
}

'use client';

import React, { useEffect, useState } from 'react';
import PropertyCard from '../../Elements/PropertyCard/PropertyCard';
import { findProperties } from '../../../services/commonService';
import { useRouter, useSearchParams } from 'next/navigation';

function PropertySection() {
  const [propertiesData, setPropertiesData] = useState<any[]>([]); // State to hold properties data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to track errors
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors before fetching
        const response = await findProperties({}, 3); // Fetch properties with a limit of 3
        console.log('Response:', response);

        if (response.success && response.data?.length) {
          setPropertiesData(response.data); // Update state with fetched data
        } else {
          setError('No properties found.'); // Handle empty response
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('An error occurred while fetching properties.'); // Handle fetch errors
      } finally {
        setLoading(false); // Always hide the loading state
      }
    };

    fetchData();
  }, []); // Run only on initial component mount

  const handleLoadMore = () => {
    router.push(`/library`);
  }

  return (
    <section
      id="properties"
      className="lg:w-[90%] m-auto lg:px-20 px-6 py-20 w-full flex flex-col justify-center items-start gap-10"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-center items-start gap-4">
        <h1 data-aos="zoom-in" className="text-red-500 text-lg sm:text-xl lg:text-2xl aos-init aos-animate">
          PROPERTIES
        </h1>
        <h1
          data-aos="zoom-in"
          className="text-black text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-snug mt-4 aos-init aos-animate"
        >
          Explore the latest
          <br />
          properties available
        </h1>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <p>Loading properties...</p> // Loading state
      ) : error ? (
        <p>{error}</p> // Error message
      ) : (
        <div
          id="grid-box"
          className="w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8"
        >
          {propertiesData.map((property, index) => (
            <PropertyCard key={index} propertyData={property} />
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
        load more properties
      </button>
    </section>
  );
}

export default PropertySection;

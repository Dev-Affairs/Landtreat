'use client';

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

function SearchMenu() {
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const city = searchParams.get('city');
    // const propertyType = searchParams.get('type')
    // const category = searchParams.get('category')
    const locations = [
        "Bhubaneswar",
        "Cuttack",
        "Puri"
    ]
    const propertyTypes = [
        "Residential",
        "Commercial",
        "Others"
    ]

    const propertyCategories = [
        "Flat",
        "Apartment/Project",
        "Duplex",
        "Triplex",
        "Independent house",
    ]

    const [city, setCity] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [category, setCategory] = useState('');
    
    const handleNavigate = () => {
        const query = new URLSearchParams({
            ...(city && { city }),
            ...(propertyType && { type: propertyType }),
            ...(category && { category }),
        }).toString();
        router.push(`/library?${query}`);
    };
    return (
        <div>
            <div className="light bg-transparent z-10">
                <div data-aos="zoom-in" id="form"
                    className="light bg-white lg:w-[70%] w-full m-auto grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-6 p-8 rounded-xl -mt-14 aos-animate aos-init border-[1px] border-[#e1e1e1]">
                    {/* <div className="w-full">
                        <h1 className="text-black font-semibold">LOCATION</h1><input type="text"
                            placeholder="Enter an address, state, city or pincode"
                            className="bg-white p-2 w-full mt-2 border-b-[1px] border-[#c9c7c1] focus:outline-none text-black" />
                    </div> */}
                    <div className="w-full">
                        <h1 className="text-black font-semibold">LOCATION</h1><select id="selectOption" name="selectOption"
                            className="bg-white p-2 border-b-[1px] w-full mt-2 border-[#c9c7c1] text-gray-500 text-md focus:outline-none"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}>
                            <option value="" >Select Location</option>
                            {locations.map((location, index) => (
                                <option value={location} key={index}>{location}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <h1 className="text-black font-semibold">TYPE</h1><select id="selectOption"
                            name="selectOption"
                            className="bg-white p-2 border-b-[1px] w-full mt-2 border-[#c9c7c1] text-gray-500 text-md focus:outline-none" value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}>
                            <option value="" >Property Type</option>
                            {propertyTypes.map((type, index) => (
                                <option value={type} key={index}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <h1 className="text-black font-semibold">CATEGORY</h1><select id="selectOption" name="selectOption"
                            className="bg-white p-2 border-b-[1px] w-full mt-2 border-[#c9c7c1] text-gray-500 text-md focus:outline-none" value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value="" >Select Category</option>
                            {propertyCategories.map((category, index) => (
                                <option value={category} key={index}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full"><button
                        className="bg-blue-600 hover:bg-green-700 text-lg p-4 w-full text-white font-semibold rounded-xl cursor-pointer transform transition-transform duration-300" onClick={handleNavigate}>SEARCH</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchMenu
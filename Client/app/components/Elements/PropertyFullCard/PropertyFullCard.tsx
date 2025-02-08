import React from 'react'

function PropertyFullCard() {
    return (
        <>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col lg:flex-row items-start lg:items-center gap-4 h-[30vh]">
                <div className="h-full w-1/4">
                    <img src="https://res.cloudinary.com/dcm4r7wmk/image/upload/v1734698614/Land-Treat/p6uptshjqhdzmiellk4n.jpg" alt="Property Image" className="w-auto h-full rounded-lg object-cover" />
                </div>

                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Flat for Sale - Star Club Apartments, Kalarahanga, Patia, Bhubaneswar
                    </h2>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                        <div>
                            <strong>Category:</strong> Flat
                        </div>
                        <div>
                            <strong>Super buildup Area:</strong> 3000 Sqft.
                        </div>
                        <div>
                            <strong>Carpet Area:</strong> 2000 Sqft.
                        </div>
                        <div>
                            <strong>Rooms:</strong> 2.5 bhk
                        </div>
                        <div>
                            <strong>Type:</strong> Residential
                        </div>
                        <div>
                            <strong>Locality:</strong> Kalarahanga
                        </div>
                    </div>
                    <p className="text-gray-500 mt-4 font-roboto line-clamp-3 overflow-hidden">
                        Discover the perfect blend of space and style in our latest listing at Star City Apartments. This flat offers
                        a super built-up area of 1200 sq ft with a generous carpet area of 820 sq ft, designed to provide ample
                        room for you and your loved ones. Spacious interiors with modern designs.
                    </p>
                </div>

                <div className="w-64 flex flex-col justify-between items-center lg:items-end text-right gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium">PS</span>
                        </div>
                        <div className="text-sm text-gray-600">Priyaranjan Sahoo</div>
                    </div>
                    <div className="text-xl font-bold text-gray-800">₹65L</div>
                    <div className="text-gray-500 text-sm">₹2.2k per sqft</div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md">
                        Contact Owner
                    </button>
                    <div className="text-sm text-gray-400">108 days ago</div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 cursor-pointer hover:text-blue-500">
                            <i className="fas fa-bookmark"></i>
                        </span>
                        <span className="text-gray-500 cursor-pointer hover:text-blue-500">
                            <i className="fas fa-share"></i>
                        </span>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PropertyFullCard
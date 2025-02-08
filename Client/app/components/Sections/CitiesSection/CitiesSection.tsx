'use client'

import React from 'react'
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';

function CitiesSection({ appConfig }: any) {
    const router = useRouter();

    const handleNavigate = (city: string) => {
        const query = new URLSearchParams({
            ...(city && { city })
        }).toString();
        router.push(`/library?${query}`);
    };
    return (
        <>
            <div className="light bg-transparent">
                <section
                    className="light bg-blue-100 lg:w-[95%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex flex-col justify-center items-center lg:px-20 px-6 py-20 gap-10"
                >
                    <div
                        id="top"
                        className="w-full grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-8"
                    >
                        <div>
                            <h1
                                data-aos="zoom-in"
                                className="text-red-500 text-lg sm:text-xl lg:text-2xl aos-init aos-animate"
                            >
                                Explore Properties By City
                            </h1>
                            <h1
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                className="text-black text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-snug mt-4 aos-init aos-animate"
                            >
                                Explore Most<br />
                                Popular Areas
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-3 justify-center items-center gap-6 cursor-pointer">
                            {appConfig.exploreCities.citiesDetails.map((city: any, index: number) => (
                                <div
                                    key={index}
                                    data-aos="zoom-in"
                                    data-aos-delay="400"
                                    className="h-[300px] sm:h-[350px] lg:h-[400px] bg-cover bg-center rounded-xl aos-init aos-animate flex items-center justify-center relative group"
                                    style={{ backgroundImage: `url("${city.image}")` }}
                                    onClick={(e) => handleNavigate(city.name)}
                                >
                                    <div className="absolute inset-0 bg-black opacity-10 rounded-xl z-0 transition-all duration-300 group-hover:opacity-60"></div>
                                    <h3
                                        className="text-lg sm:text-xl lg:text-2xl text-white z-10 transform transition-transform duration-300 group-hover:scale-110"
                                    >
                                        {city.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default CitiesSection
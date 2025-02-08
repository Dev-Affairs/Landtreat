import React from 'react'

export default function ShortAboutSection({ appConfig }: any) {
    return (
        <>
            <section id="about"
                className="light bg-transparent w-full m-auto lg:px-40 px-10 py-20 grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-10">
                <div><img data-aos="zoom-in" src={appConfig.whatWeDo.image} alt=""
                    className="rounded-2xl lg:w-[500px] lg:h-[600px] aos-init aos-animate" /></div>
                <div className="flex flex-col justify-center items-start gap-4 sm:gap-8">
                    <h1 data-aos="zoom-in" className="text-red-500 text-lg sm:text-xl lg:text-2xl aos-init aos-animate">WHAT DO WE DO</h1>
                    <h1 data-aos="zoom-in" data-aos-delay="200"
                        className="text-black text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-snug mt-4 aos-init aos-animate">{appConfig.whatWeDo.heading}</h1>
                    <p data-aos="zoom-in" data-aos-delay="400"
                        className="text-xl text-gray-600 text-justify aos-init aos-animate">{appConfig.whatWeDo.content}</p>
                    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                        <a
                            data-aos="zoom-in"
                            data-aos-delay="600"
                            className="bg-blue-600 text-sm sm:text-md px-6 sm:px-10 py-3 sm:py-4 text-white font-semibold rounded-xl hover:bg-blue-700 cursor-pointer transform aos-init aos-animate uppercase w-full sm:w-auto text-center"
                            href="/about"
                        >
                            More About Us
                        </a>
                        <a
                            data-aos="zoom-in"
                            data-aos-delay="600"
                            className="bg-blue-600 text-sm sm:text-md px-6 sm:px-10 py-3 sm:py-4 text-white font-semibold rounded-xl hover:bg-blue-700 cursor-pointer transform aos-init aos-animate uppercase w-full sm:w-auto text-center"
                            href="/contact"
                        >
                            Contact Us
                        </a>
                    </div>

                </div>
            </section>
        </>
    )
}

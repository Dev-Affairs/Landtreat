import React from 'react'

function TestimonialSection({ appConfig }: any) {
    return (
        <>
            <div className="light bg-transparent">
                <section id="testimonials"
                    className="light bg-transparent lg:w-[95%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-start lg:px-20 px-6 py-20 gap-20">
                    <div className="flex flex-col justify-center items-start gap-4">
                        <h1 data-aos="zoom-in" className="text-red-500 text-lg sm:text-xl lg:text-2xl aos-init aos-animate">OUR CLIENTS</h1>
                        <h1 data-aos="zoom-in" className="text-black text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-snug mt-4 aos-init aos-animate">
                            What are our clients <br />saying about us</h1>
                    </div>
                    <div id="clients-box" className="grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8 w-full">
                        {appConfig.testimonials.map((testimonial: any, index: number) => (
                            <div data-aos="zoom-in" data-aos-delay="200"
                                className="bg-orange-100 hover:bg-orange-200 cursor-pointer p-12 flex flex-col justify-center items-center gap-6 rounded-xl w-full aos-init group" key={index}>
                                <div className="flex justify-start items-center w-full gap-4"><img src={testimonial.image || '/avatars/default_user.png'}
                                    alt="" className="w-[70px] transform hover:scale-105 transition-transform duration-300" />
                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h1 className="text-xl text-black font-semibold">{testimonial.name}</h1>
                                        <h1 className="text-slate-600">{testimonial.review}</h1>
                                    </div>
                                </div>
                                <p className="text-md text-justify text-slate-600">{testimonial.description}</p>
                                <div className="flex justify-start items-start gap-2 w-full">
                                    {[...Array(5)].map((_, index) => (
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512"
                                            className={(testimonial.rating > index) ? "text-yellow-400 group-hover:text-yellow-600" : "text-slate-200 group-hover:text-white" + " size-4"} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" key={index}>
                                            <path
                                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                                            </path>
                                        </svg>
                                    ))}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default TestimonialSection
import React from 'react'

function Hero({ appConfig }: any) {
    console.log("appConfig", appConfig)
    return (
        <>
            <div className="light bg-white mt-3 mb-3">
                <section
                    id="hero"
                    className="w-[95%] h-[600px] m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-start lg:px-28 px-5 gap-5 z-20 sm:h-[500px]"
                    style={{ backgroundImage: 'url(' + appConfig.hero.image + ')' }}
                >
                    <h1
                        data-aos="zoom-in"
                        className="text-white font-semibold aos-init aos-animate lg:pr-[500px] pr-0 lg:leading-[70px] leading-[60px] sm:text-5xl text-3xl"
                    >
                        <span className="text-[rgb(47,105,230)]">Property</span> With Genuine Price
                    </h1>
                    <p
                        data-aos="zoom-in"
                        className="text-white aos-init aos-animate lg:pr-[500px] pr-0 sm:text-xl text-lg"
                    >
                        {appConfig.hero.description}
                    </p>
                </section>

            </div>
        </>
    )
}

export default Hero
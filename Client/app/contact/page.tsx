import React from 'react'
import type { Metadata } from 'next';

export async function generateMetadata({ }): Promise<Metadata> {

  return {
    title: `Land Treat - Contact`,
    description: "Discover the best properties at authentic prices with Landtreat. Your trusted platform for transparent and genuine real estate deals, ensuring a seamless experience for property buyers and sellers.",
    keywords: ['property', 'real estate', 'land treat'],
    alternates: {
      canonical: `https://landtreat.com/contact`,
    },
    other: {
      'geo.placename': 'India',
      'geo.country': 'in',
      'revisit-after': '1 days'
    },
    openGraph: {
      title: "Land Treat - Contact",
      description: "Discover the best properties at authentic prices with Landtreat. Your trusted platform for transparent and genuine real estate deals, ensuring a seamless experience for property buyers and sellers.",
      url: `https://landtreat.com/`,
      type: 'website',
      siteName: 'Land Treat',
      images: [
        {
          url: `https://landtreat.com/og/og_image.png`,
          width: 1200,
          height: 630
        }
      ],
    }
  };
}

function page() {
  const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.6042092978764!2d85.83930527595778!3d20.357963010478432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19095c6f320f35%3A0x491d924d33c8ff66!2sAxis%20Bank%20Branch!5e0!3m2!1sen!2sin!4v1732801687583!5m2!1sen!2sin"

  return (
    <>
      <div className="container mx-auto flex flex-col gap-4 mt-[2vh] mb-[5vh] px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl uppercase font-bold text-[rgb(47,105,230)] mx-auto w-full flex justify-center items-center text-center h-auto md:h-[10vh]">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="w-full border border-[#e1e1e1] rounded-xl p-4 grid gap-4">
            <div>
              <h3 className="text-xl md:text-2xl text-black">Send A Message</h3>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="w-full flex flex-col gap-2">
                <span className="text-base md:text-lg text-black">Full Name</span>
                <input
                  type="text"
                  placeholder="Please Enter Your Full Name"
                  className="p-2 border border-gray-300 rounded-md text-black w-full select-none focus:bg-blue-100 bg-gray-100 focus:outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-base md:text-lg text-black">Email</span>
                <input
                  type="email"
                  placeholder="Please Enter Your Email"
                  className="p-2 border border-gray-300 rounded-md text-black w-full select-none focus:bg-blue-100 bg-gray-100 focus:outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-base md:text-lg text-black">Subject</span>
                <input
                  type="text"
                  placeholder="Please Enter Subject"
                  className="p-2 border border-gray-300 rounded-md text-black w-full select-none focus:bg-blue-100 bg-gray-100 focus:outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-base md:text-lg text-black">Message</span>
                <textarea
                  placeholder="Please Enter Message"
                  className="p-2 border border-gray-300 rounded-md text-black w-full h-32 md:h-[200px] select-none focus:bg-blue-100 bg-gray-100 focus:outline-none"
                ></textarea>
              </div>
            </div>
            <div className="mt-4 mb-4 text-right">
              <button className="bg-[rgb(47,105,230)] text-white p-2 rounded-md w-max">
                Send Message
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="w-full lg:w-[80%] border border-[#e1e1e1] rounded-xl p-4">
              <div className="grid gap-4">
                <h3 className="text-xl md:text-2xl text-black">Contact Info</h3>
                <div className="flex gap-4 items-center">
                  <span className="w-8 h-8 md:w-10 md:h-10 bg-[rgb(47,105,230)] rounded-md flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </span>
                  <p className="text-base md:text-xl text-black">
                    Plot No - 170/266/305 Kalarahanga, Near Axis Bank Patia, Bhubaneswar.
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="w-8 h-8 md:w-10 md:h-10 bg-[rgb(47,105,230)] rounded-md flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                  <p className="text-base md:text-xl text-black">landtreat&#64;gmail.com</p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="w-8 h-8 md:w-10 md:h-10 bg-[rgb(47,105,230)] rounded-md flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </span>
                  <p className="text-base md:text-xl text-black">
                    +918917621507 <br /> +919937575594
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <iframe
                src={iframeSrc}
                className="w-full md:w-4/5 h-40 md:h-96 rounded-xl"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default page
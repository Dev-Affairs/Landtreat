import React from 'react'
import Social from '../../Elements/Social/Social'

function Footer() {
    
        return (
        <>
            <footer
                className="light bg-gray-800 w-full m-auto lg:px-20 px-10 py-20 grid lg:grid-cols-3 grid-cols-1 justify-center items-start lg:gap-20 gap-10">
                <div className="flex flex-col justify-center items-start gap-3">
                    <h1 className="text-white text-2xl font-semibold">Get In Touch With Us</h1>
                    <div id="social-icons" className="flex justify-start items-center gap-4 mt-4">
                        <Social />
                    </div>
                    <h1 className="text-white mt-8">Copyright Real Estate, All Rights Reserved</h1>
                </div>
                <div className="flex flex-col justify-center items-start gap-5">
                <h1 className="text-white text-2xl font-semibold">About Us</h1>
                    <p className="text-slate-200 text-justify">Through our proprietary platform, WpResidence is revolutionizing the way agents and clients navigate the process of buying or selling a home.</p>
                </div>
                <div className="flex flex-col justify-center items-start gap-5">
                    <h1 className="text-white text-2xl font-semibold">Contact Us</h1>
                    <div className="flex justify-center items-center gap-3"><svg stroke="currentColor" fill="currentColor"
                        strokeWidth="0" viewBox="0 0 448 512" className="text-white size-5" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z">
                        </path>
                    </svg>
                        <p className="text-slate-200">Plot No - 170/266/305 Kalarahanga, Near Axis Bank Patia, Bhubaneswar.</p>
                    </div>
                    <div className="flex justify-center items-center gap-4"><svg stroke="currentColor" fill="currentColor"
                        strokeWidth="0" viewBox="0 0 320 512" className="text-white size-5" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z">
                        </path>
                    </svg>
                        <p className="text-slate-200">+919937575594</p>
                    </div>
                    <div className="flex justify-center items-center gap-4"><svg stroke="currentColor" fill="currentColor"
                        strokeWidth="0" viewBox="0 0 512 512" className="text-white size-5" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M480 160V77.25a32 32 0 0 0-9.38-22.63L425.37 9.37A32 32 0 0 0 402.75 0H160a32 32 0 0 0-32 32v448a32 32 0 0 0 32 32h320a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM288 432a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm128 128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-112H192V64h160v48a16 16 0 0 0 16 16h48zM64 128H32a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h32a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32z">
                        </path>
                    </svg>
                        <p className="text-slate-200">+918917621507</p>
                    </div>
                    <div className="flex justify-center items-center gap-4"><svg stroke="currentColor" fill="currentColor"
                        strokeWidth="0" viewBox="0 0 512 512" className="text-white size-5" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z">
                        </path>
                    </svg>
                        <p className="text-slate-200">landtreat@gmail.com</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
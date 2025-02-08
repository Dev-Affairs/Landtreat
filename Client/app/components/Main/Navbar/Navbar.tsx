import React from 'react'
import UserProfile from '../../Elements/UserProfile/UserProfile'
import AddPropertyButton  from '../../Elements/AddPropertyButton/AddPropertyButton'
function Navbar() {
    return (
        <>
            <nav className="light bg-[#f3f3f3] flex justify-between items-center gap-4 bg- lg:px-20 px-4 py-3 sticky top-0 z-30 border-b-[1px] border-b-[#e1e1e1]">
                <a id="logo" className='flex gap-2 select-none cursor-pointer' href='/'>
                    <img rel="preload" src="/logos/landtreat_icon.svg" alt="" className="lg:w-[50px] w-[40px]" />
                    <div className='flex justify-center items-center'>
                        <h1 data-aos="zoom-in"
                            className="text-3xl text-black font-bold gap-1 w-fit h-fit items-center hidden sm:flex">
                            <span className='text-[rgb(47,105,230)]'>Land</span> Treat</h1>
                    </div>
                </a>
                <div className="flex justify-center items-center lg:gap-8 gap-2">
                    <AddPropertyButton />
                    <div className="flex justify-center items-center lg:gap-3 gap-1">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="size-5 text-blue-600"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                            ></path>
                        </svg>
                        <h1 className="lg:text-xl text-sm text-black font-semibold">
                            +918917621507
                        </h1>
                    </div>
                    {/* <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 496 512"
                        className="size-6 text-red-600"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                        ></path>
                    </svg> */}
                    <UserProfile />
                </div>

            </nav>
        </>
    )
}

export default Navbar
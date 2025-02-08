'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import appConfig from '@/app/services/appConfig';

function AddProperty() {
    const router = useRouter();

    const routeToAddProperty = () => {
        window.open(appConfig.Admin_Site_Url + 'addProperty', "_self")
      }
    return (
        <>
            <div className="items-center justify-center hidden sm:flex">
                <span className="relative inline-flex">
                    <button
                        type="button"
                        className="hidden sm:inline-block rounded-md text-black bg-yellow-400 border-2 border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 px-4 py-2 text-sm font-semibold uppercase transition transform duration-300"
                        onClick={routeToAddProperty}>
                        Add Property for Free
                    </button>
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                </span>
            </div>
        </>
    )
}

export default AddProperty
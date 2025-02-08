'use client'

import appConfig from '@/app/services/appConfig'
import { faCircleInfo, faEdit, faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface propertyProp {
    propertyId: string
}

function PropertyActionButton({propertyId}: propertyProp) {

    console.log("propertyId=", propertyId)
    const onEditPropertyClick = () => {
        window.open(`${appConfig.Admin_Site_Url}editProperty?propertyid=${propertyId}`, "_self")
    }

    const onPropertyCInfolick = () => {
        
    }

    const onDeletePropertyClick = () => {
        
    }

    return (
        <>
            <div className="group fixed bottom-0 right-0 p-6  flex items-end justify-end w-24 h-24 ">
                <div className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  cursor-pointer">
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16  flex  p-2 hover:p-3 bg-gray-500 hover:bg-gray-700  text-white cursor-pointer">
                    <FontAwesomeIcon icon={faCircleInfo} />
                </div>
                <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-16   flex  p-2 hover:p-3 bg-blue-500 scale-100 hover:bg-blue-700 text-white cursor-pointer" onClick={() => onEditPropertyClick()}>
                    <FontAwesomeIcon icon={faEdit} />
                </div>
                <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-14 group-hover:-translate-x-14   flex  p-2 hover:p-3 bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
        </>
    )
}

export default PropertyActionButton
'use client'

import React, { useEffect, useState } from 'react'
import { isAuthenticated, fetchUserInfo } from '../../../utils/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import appConfig from '@/app/services/appConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import UserProfileMenu from './UserProfileMenu'
function UserProfile() {
    const router = useRouter();

    const [authData, setAuthData] = useState({
        status: false,
        userInfo: {
            exp: 0,
            iat: 0,
            user: {
                email: "",
                firstName: "",
                id: "",
                lastName: "",
                role: ""
            }
        }
    });

    const [activeUserProfileMenu, setActiveUserProfileMenu] = useState(false);

    useEffect(() => {
        const isLoggedIn = isAuthenticated();
        const userInfo = fetchUserInfo();
        const parsedUserInfo = userInfo ? JSON.parse(userInfo) : {
            exp: 0,
            iat: 0,
            user: {
                email: "",
                firstName: "",
                id: "",
                lastName: "",
                role: ""
            }
        }
        setAuthData({
            status: isLoggedIn,
            userInfo: parsedUserInfo
        });
    }, []);

    const routeToAuth = () => {
        // router.push(`/app/auth`);
        window.open(appConfig.Admin_Site_Url + 'auth', "_self")
    }
    const routeToAdmin = () => {
        window.open(appConfig.Admin_Site_Url + 'admin', "_self")
    }
    return (
        <>
            {
                !authData.status ? (
                    <div onClick={routeToAuth}>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 uppercase">Login</button>
                    </div>
                ) :
                    (
                        <div className='flex gap-2'>
                            {
                                authData.userInfo.user.role == 'admin' &&
                                <div className='text-black w-10 cursor-pointer hover:text-blue-700 text-xl flex items-center justify-center' onClick={routeToAdmin}>
                                    <FontAwesomeIcon icon={faSlidersH} />
                                </div>
                            }
                            <img src="/avatars/default_user.png" alt="" className="w-10 transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={(e) => setActiveUserProfileMenu(true)}/>
                        </div>
                    )
            }

            {
                activeUserProfileMenu && < UserProfileMenu userInfo={authData.userInfo} setActiveUserProfileMenu={setActiveUserProfileMenu}/>
            }
        </>
    )
}

export default UserProfile
'use client'

import React from 'react'

interface UserInfoProps {
    userInfo: any;
    setActiveUserProfileMenu: (value: boolean) => void;
}

function UserProfileMenu({ userInfo, setActiveUserProfileMenu }: UserInfoProps) {
    const currentUser = userInfo.user
    const routeToAdmin = () => {
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        setActiveUserProfileMenu(false)
        window.location.reload()
    }
    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <div className="flex justify-between items-end mb-4">
                        <button className="text-gray-500 hover:text-gray-700 ml-auto" aria-label="Close Modal"
                            onClick={() => setActiveUserProfileMenu(false)}>
                            ✕
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <img src="/avatars/default_user.png" alt="User Avatar" className="w-20 h-20 rounded-full border border-gray-300 shadow" />

                        <h2 className="text-xl text-black">{currentUser.firstName} {currentUser.lastName}</h2>
                        <p className="text-gray-700 text-sm">{currentUser.role || ''}</p>
                        <p className="text-gray-500 text-sm">{currentUser.email}</p>

                        <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition" onClick={handleLogOut}>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileMenu
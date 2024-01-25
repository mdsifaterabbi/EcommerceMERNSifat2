import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="w-[300px] mx-auto">
                <h1 className="text-center">User Menu</h1>
                <ul className="menu rounded-box text-center min-w-max">
                    <li className="flex items-center justify-center text-red-600">
                        <Link to="/dashboard/user/profile" className="text-center border-[1px] border-purple-600 m-[2px]">Profile</Link>
                    </li>
                    <li className="flex items-center justify-center text-red-600">
                        <Link to="/dashboard/user/orders" className="text-center border-[1px] border-purple-600 m-[2px]">Orders</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UserMenu
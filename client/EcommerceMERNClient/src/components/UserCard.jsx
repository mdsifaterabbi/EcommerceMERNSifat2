import { BsArrowBarRight, BsArrowBarDown } from "react-icons/bs";
import userModel from "../../../../models/userModel.js";
import { useEffect, useState } from "react";
import { useAuth } from "../authContextAPI.jsx";

const UserCard = ({ userData }) => {
    const { user, email, role, phone, address } = userData;

    return (
        <>
            <div className="w-[300px] rounded-md border mx-auto">
                <div className="p-4">
                    <h1 className="inline-flex items-center text-lg font-semibold">
                        {
                            role === 1 ? "  Admin Information" : "  User Information"
                        }
                        &nbsp; <BsArrowBarDown className="h-4 w-4" />
                    </h1>
                    <p className="mt-3 text-sm text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
                    </p>
                    <div className="mt-4">
                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                            {user}
                        </span>
                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                            {email}
                        </span>
                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                            Role:
                            {
                                role === 1 ? "  Admin" : "  User"
                            }
                        </span>
                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                            Phone: {phone}
                        </span>
                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                            Address: {address}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Read
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserCard
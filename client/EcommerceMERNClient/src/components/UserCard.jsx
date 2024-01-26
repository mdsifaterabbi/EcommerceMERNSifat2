import { BsArrowBarRight, BsArrowBarDown } from "react-icons/bs";
import userModel from "../../../../models/userModel.js";
import { useEffect, useState } from "react";
import { useAuth } from "../authContextAPI.jsx";
import axios from "axios";

const UserCard = ({ userData }) => {
    //const { user, email, role, phone, address } = userData;

    const [auth, setAuth] = useAuth();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');


    const getUserInfo = async () => {
        try {
            const email = auth?.email;
            //finding user using email
            const { data } = await axios.post('http://localhost:3000/api/v1/auth/user', { email });


            setName(data?.user.name);
            setAddress(data?.user.address);
            setPhone(data?.user.phone);
            setEmail(data?.user.email);
            setAnswer(data?.user.answer);
            setRole(data?.user.role);
            setId(data?.user._id);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [auth]);



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

                    <div className="mt-4">
                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                            {name}
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

                </div>
            </div>
        </>
    )
}

export default UserCard
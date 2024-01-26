
import axios from "axios";
import { useAuth } from "../../authContextAPI";
import Layout from "../../layout/Layout"
import UserMenu from "./UserMenu"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
//import { useCurrentUser } from "../../currentUserAPI";


const Profile = () => {
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


    //form handleUpdate function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            //axios put request will be here
            const { data } = await axios.put(`${import.meta.env.VITE_REACT_API}/api/v1/auth/user/update/${id}`, { name, email, phone, address, answer });

            if (data?.success) {
                toast.success(data.updatedUser.name + " Updated");
            }


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in handleUpdate function");
        }
    }


    return (
        <Layout title={"user profile"}>
            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/3 border text-center mt-[50px] mb-[50px]">
                    <UserMenu />
                </div>
                <div className="basis-2/3 text-center">
                    <div className="flex items-center justify-center h-[70vh] flex-col">
                        <h1>Profile Update Form</h1>
                        <h1>Status: {role == 0 ? 'General User' : 'Admin'}</h1>
                        <form className="space-y-6" onSubmit={handleUpdate}>
                            <div>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] uppercase placeholder:lowercase"
                                        placeholder="your name..."
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        disabled
                                        className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase bg-slate-500"
                                        placeholder="email"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        autoComplete="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase"
                                        placeholder="phone number"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        autoComplete="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase uppercase"
                                        placeholder="address"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <input
                                        id="answer"
                                        name="answername"
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        autoComplete="answer"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] uppercase placeholder:lowercase"
                                        placeholder="add clue for password"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Profile
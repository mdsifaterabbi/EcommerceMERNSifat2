import { useState } from "react"
import axios from 'axios'
import Layout from "../../layout/Layout"
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //form handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //handle API from express backend
            const res = await axios.post(`${import.meta.env.VITE_REACT_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });

            if (res && res.data.user) {
                console.log("Inserted");
                toast.success(res.data.message);
            }
            else {

                console.log("Already exists");
                toast.error(res.data.message);

                setTimeout(() => {
                    navigate('/login');
                }, 3000); // Delay for 3 seconds (adjust as needed)

            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }


    return (
        <Layout title={'Register'}>
            <div className="flex items-center justify-center h-[70vh] flex-col">
                <h1>Register page</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>

                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                required
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
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase"
                                placeholder="email"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">


                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase"
                                placeholder="password"
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
                                required
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
                                name="answer"
                                type="text"
                                autoComplete="answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase"
                                placeholder="what is your favourite color?"
                            />
                        </div>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>

        </Layout>
    )
}

export default Register
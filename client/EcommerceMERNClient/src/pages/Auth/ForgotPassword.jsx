import { useState } from "react"
import axios from 'axios'
import Layout from "../../layout/Layout"
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //form handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //handle API from express backend
            const res = await axios.post(`${import.meta.env.VITE_REACT_API}/api/v1/auth/forgot-password`, { email, newPassword, answer });

            if (res && res.data.user) {
                console.log("Password reset successfully!");
                toast.success(res.data.message);

                // Delay navigation using setTimeout
                setTimeout(() => {
                    navigate("/login");
                }, 3000); // Delay for 3 seconds (adjust as needed)

            }
            else {
                console.log("Cann't reset password 😢");
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }


    return (
        <Layout title={"Forgot-Password"}>
            <div className="flex items-center justify-center h-[70vh] flex-col">
                <h1>Reset Password</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>

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
                        <div className="mt-2">
                            <input
                                id="answer"
                                name="answer"
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                autoComplete="answer"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase"
                                placeholder="your favourite color"
                            />
                        </div>
                    </div>

                    <div>

                        <div className="mt-2">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-start pl-[5px] placeholder:lowercase"
                                placeholder="new password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Layout from "../layout/Layout";

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,

        })

        return () => clearInterval(interval)

    }, [count, navigate, location, path]);

    return (
        <Layout>
            <div className="flex items-center justify-center h-[70vh] flex-col">
                <span className="loading loading-spinner text-neutral"></span><span className="text-3xl">{count}</span>
            </div>
        </Layout>
    )
}

export default Spinner
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../authContextAPI";
import Spinner from "../components/Spinner";
import DashBoard from "../pages/User/DashBoard";


export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/user-auth');
            //if (res.data.ok) 
            if (res) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }

        if (auth?.token) authCheck()

    }, [auth?.token])

    //return !ok ? <Spinner /> : <Outlet />;
    return ok ? <Outlet /> : <Spinner path="" />;
}
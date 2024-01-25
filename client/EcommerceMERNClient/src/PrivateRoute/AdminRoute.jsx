import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../authContextAPI";
import Spinner from "../components/Spinner";
// import DashBoard from "../pages/User/DashBoard";
import AdminDashboard from "../pages/Admin/AdminDashboard";


export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth');

            console.log(auth?.role);

            // if (res) {
            //     setOk(true);

            // }
            // else {
            //     setOk(false);

            // }
            if (auth?.role === 1) {
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

import { useState, useEffect, createContext, useContext } from "react";
import axios from 'axios';
import userModel from "../../../models/userModel";


const AuthContextObj = createContext(); //creating context object named as AuthContextObj

const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        email: null,
        role: null,
        phone: null,
        address: null,
        token: ""
    })

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parsedData.user,
                email: parsedData.email,
                role: parsedData.role,
                phone: parsedData.phone,
                address: parsedData.address,
                token: parsedData.token
            });
        }
        //eslint-disable-next-line
    }, [])



    return <AuthContextObj.Provider value={[auth, setAuth]}>
        {children}
    </AuthContextObj.Provider>
}

//custom hook
const useAuth = () => useContext(AuthContextObj);

export { useAuth, AuthContextProvider }

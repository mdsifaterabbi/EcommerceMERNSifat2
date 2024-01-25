
import { useState, useEffect, createContext, useContext } from "react";
import userModel from "../../../models/userModel";


const SearchContextObj = createContext(); //creating context object named as AuthContextObj

const SearchContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    })



    return <SearchContextObj.Provider value={[auth, setAuth]}>
        {children}
    </SearchContextObj.Provider>
}

//custom hook
const useSearch = () => useContext(SearchContextObj);

export { useSearch, SearchContextProvider }

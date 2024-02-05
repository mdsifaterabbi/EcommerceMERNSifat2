import { useState, useEffect, createContext, useContext } from "react";
import userModel from "../../../models/userModel";

const CartContextObj = createContext(); //creating context object named as CartContextObj

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState("");
  const [currentTranId, setCurrentTranId] = useState("");

  return (
    <CartContextObj.Provider
      value={[
        cart,
        setCart,
        currentOrderId,
        setCurrentOrderId,
        currentTranId,
        setCurrentTranId,
      ]}
    >
      {children}
    </CartContextObj.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContextObj);

export { useCart, CartContextProvider };

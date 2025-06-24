import React, { createContext, useContext, useEffect, useState } from "react";
export const GlobalContext = createContext(null);
const GlobalContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saveData = localStorage.getItem("cartItems");
    return saveData ? JSON.parse(saveData) : [];
  });
  const [user, setUser] = useState(null);
  const [deleteCartItems, setDeleteCartItems] = useState(false);
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState(null);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteCartItem = (id) => {
    const checkCartItem = cartItems.filter((item) => item.id !== id);
    console.log(checkCartItem, "new array");

    setCartItems(checkCartItem);
  };

  const GlobalValue = {
    cartItems,
    setCartItems,
    user,
    setUser,
    deleteCartItem,
    count,
    setCount,
    deleteCartItems,
    setDeleteCartItems,
    cart,
    setCart,
  };
  return (
    <GlobalContext.Provider value={GlobalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error("useGlobalContext must be used within a a GlobalProvider");
  }
  return context;
}

export default GlobalContextProvider;

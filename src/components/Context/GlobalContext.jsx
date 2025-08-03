import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
export const GlobalContext = createContext(null);
const GlobalContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saveData = localStorage.getItem("cartItems");
    const parsed = saveData ? JSON.parse(saveData) : [];

    // Filter out incomplete items
    return parsed.filter((item) => item.price && item.quantity && item.title);
  });
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState([]);
  const [deleteCartItems, setDeleteCartItems] = useState(false);
  const [auth, setAuth] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [persist, setPersist] = useState(() => {
    try {
      return localStorage.getItem("persist") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("/auth/verify", {
          withCredentials: true,
        });

        setAuth({
          username: res.data.user.username,
          userId: res.data.user.id,
          isLoggedIn: true,
        });
      } catch (error) {
        setAuth({ username: "", userId: "", isLoggedIn: false });
      } finally {
        setIsVerifying(false);
      }
    };

    if (persist) {
      verifyUser();
    } else {
      setIsVerifying(false);
    }
  }, [persist]);

  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
    setAuth(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("persist");
  };

  const setAuthAndPersist = (authData) => {
    setAuth(authData); // No localStorage
  };

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
    menu,
    setMenu,
    auth,
    setAuth,
    errMsg,
    setErrMsg,
    isVerifying,
    setIsVerifying,
    setAuthAndPersist,
    logout,
    persist,
    setPersist,
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
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}

export default GlobalContextProvider;

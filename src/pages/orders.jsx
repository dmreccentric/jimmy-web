import React from "react";
import Cart from "../components/Cart";
import { useGlobalContext } from "../components/Context/GlobalContext";

function Orders() {
  const { setCart } = useGlobalContext();
  return (
    <div>
      <Cart onClose={() => setCart(null)} />
    </div>
  );
}

export default Orders;

import React from "react";
import { FiMinusCircle } from "react-icons/fi";
import { LuCirclePlus } from "react-icons/lu";
import { useGlobalContext } from "./Context/GlobalContext";

export function CartCard({ img, title, desc, onRemove, id, price, quantity }) {
  const { cartItems, setCartItems } = useGlobalContext();
  const updateQuantity = (newQty) => {
    if (newQty < 1) return; // optional: prevent zero or negative qty
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
  };
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <img
        src={img}
        alt={title}
        className="w-24 h-24 object-cover rounded-xl"
      />

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 capitalize">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <FiMinusCircle
              className="text-2xl hover:cursor-pointer"
              onClick={() => updateQuantity(quantity - 1)}
            />
            <p>{quantity}</p>
            <LuCirclePlus
              className="text-2xl hover:cursor-pointer"
              onClick={() => updateQuantity(quantity + 1)}
            />
          </div>
        </div>
        <div className=" flex justify-between items-center mt-5">
          <span className="text-lg font-bold text-green-600">
            &#8358;
            {price * quantity}
          </span>
          {onRemove && (
            <button
              onClick={() => onRemove(id)}
              className="text-red text-lg hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

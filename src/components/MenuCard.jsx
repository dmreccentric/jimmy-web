import { FaCirclePlus } from "react-icons/fa6";
import { GlobalContext, useGlobalContext } from "./Context/GlobalContext";
import { useContext, useEffect } from "react";

import { toast } from "react-toastify";

const MenuCard = ({ items }) => {
  const { setCartItems, cartItems, setMenu, menu } = useGlobalContext();

  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/menu");
      if (res.ok) {
        console.log("fetched data sucessfully");
      } else {
        throw new Error("could not fetch data");
      }
      const data = await res.json();
      setMenu(data.menu);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  const handleAddToCart = (id) => {
    const newCartItem = menu.find((item) => item.id === id);
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...newCartItem, quantity: +1 }]);
    }
    toast("Added To Cart");
  };
  return (
    <div className="grid gap-4 mb-10 px-4 md:px-16  md:grid-cols-2 ">
      {items.map(({ id, title, img, price, desc }) => {
        return (
          <article key={id} className="md:flex gap-4">
            <img
              src={img}
              alt={title}
              className="object-fit h-[200px] border-[0.25rem] rounded-lg md:h-[11rem] w-full md:w-[15rem] border-blue"
            />
            <div>
              <header className="flex justify-between md:pt-0 pt-3  md:pb-0  pb-3 border-b-[0.5px]">
                <h4 className="capitalize font-bold tracking-[2px] text-blue">
                  {title}
                </h4>
                <div className="flex gap-11 mr-3">
                  <h4 className="text-blue font-bold">₦{price}</h4>
                  <FaCirclePlus
                    onClick={() => handleAddToCart(id)}
                    title="click to add order"
                    className=" hidden md:block ml-auto mb-auto text-[1.8rem] text-blue md:mb-2 hover:cursor-pointer"
                  />
                </div>
              </header>
              <p className="mb-0 pt-4 text-lg text-gray-400 capitalize ">
                {desc}
              </p>
              <FaCirclePlus
                onClick={() => handleAddToCart(id)}
                title="click to add order"
                className="ml-auto md:hidden mb-auto text-[1.8rem] text-blue md:mb-2 hover:cursor-pointer"
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MenuCard;

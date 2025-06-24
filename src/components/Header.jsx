import React, { useState } from "react";
import ReuseableBtn from "./ReuseableBtn";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

import NavLinks from "./NavLinks";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import Cart from "./Cart";
import { useGlobalContext } from "./Context/GlobalContext";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { cartItems, cart, setCart } = useGlobalContext();
  return (
    <div className="flex justify-between items-center p-4  shadow-lg fixed top-0 left-0 w-full z-50 h-[5rem] bg-white">
      <div className="brand-logo text-xl font-bold">MyBrand</div>

      <div className="ml-auto pr-7 cursor-pointer relative">
        <Link to={"/orders"}>
          <IoCartOutline className="text-3xl text-blue" />
          {cartItems.length >= 1 ? (
            <div
              className="w-6 h-5 absolute bg-blue
         top-0 right-4 rounded-full text-center flex items-center justify-center pb-0.4 text-white "
              onClick={() => setCart(true)}
            >
              {cartItems.length > 9 ? "9+" : cartItems.length}
            </div>
          ) : (
            <div></div>
          )}
        </Link>
      </div>
      {/* Desktop Nav - Hidden on Mobile */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLinks />
        <ReuseableBtn
          title={"Contact Me"}
          icon={<FaArrowRightLong />}
          primary
        />
      </div>

      {/* Menu Toggle Button - Only visible on small screens */}
      {!isOpen ? (
        <FiMenu
          size={30}
          className="md:hidden text-blue cursor-pointer z-50"
          onClick={toggleSidebar}
        />
      ) : (
        <FiX
          size={30}
          className="md:hidden tex-blue cursor-pointer z-50"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-[75%] bg-white shadow-lg transform transition-transform duration-1000 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        <div className="p-6 space-y-9 flex flex-col gap-40">
          <NavLinks />
          <ReuseableBtn
            title={"Contact Me"}
            icon={<FaArrowRightLong />}
            primary
            link="/contact_me"
          />
        </div>
      </div>
      {cart && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <Cart onClose={() => setCart(null)} />
        </div>
      )}
    </div>
  );
}

export default Header;

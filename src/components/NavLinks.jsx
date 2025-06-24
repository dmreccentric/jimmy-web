import React from "react";
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";

const navItems = [
  { id: 1, name: "home", link: "/" },
  { id: 2, name: "menus", link: "/menus" },
  { id: 3, name: "orders", link: "/orders" },
  { id: 4, name: "services", link: "/services" },
];
const NavItem = ({ name, link }) => (
  <Link to={link}>
    {" "}
    <li className="font-bold gap-3 flex space-x-3 justify-between items-center  z-60 hover:border-[2px] active:border-[2px] border-primary rounded-md p-2 text-blue">
      {name} <SlArrowDown size={10} />
    </li>
  </Link>
);
const NavLinks = () => {
  return (
    <ul className="md:flex capitalize  mt-6 space-x-4">
      {navItems.map((link, i) => (
        <NavItem name={link.name} key={i} link={link.link} />
      ))}
    </ul>
  );
};
export default NavLinks;

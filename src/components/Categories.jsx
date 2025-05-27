import React from "react";
import slide1 from "../assets/pastries.jpg";
import slide2 from "../assets/food_tray.jpg";
import slide3 from "../assets/cakes.jpg";
import slide4 from "../assets/drinks.jpg";
import { Link } from "react-router-dom";

const items = [
  { title: "PASTRIES", img: slide1, link: "/menus", category: "pastries" },
  { title: "FOOD TRAY", img: slide2, link: "/menus", category: "foodtray" },
  { title: "CAKES", img: slide3, link: "/menus", category: "cake" },
  { title: "DRINKS", img: slide4, link: "/menus", category: "drinks" },
];

const Cards = ({ title, img, link, category }) => {
  return (
    <Link to={`${link}?category=${category}`}>
      {" "}
      <div className="relative md:w-64 md:h-40 w-96 h-32 rounded-3xl shadow-md overflow-hidden cursor-pointer">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        ></div>

        {/* Overlay with hover effect */}
        <div className="absolute inset-0 bg-black bg-opacity-40  transition-opacity duration-300 hover:bg-opacity-70 active:bg-opacity-70"></div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-white text-lg font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

const Categories = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-4 p-4  md:grid-cols-4 ">
        {items.map((item, index) => (
          <Cards
            key={index}
            title={item.title}
            img={item.img}
            link={item.link}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

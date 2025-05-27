import React, { useState } from "react";
import { menu } from "../constants/product";
import MenuButtons from "../components/MenuButtons";
import MenuCard from "../components/MenuCard";
import Template from "../components/Template";

function Menus() {
  const [menuItems, setMenuItems] = useState(menu);
  const categories = ["all", ...new Set(menu.map((item) => item.category))];
  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(menu);
    } else {
      const filteredItem = menu.filter((item) => item.category === category);
      setMenuItems(filteredItem);
    }
  };
  return (
    <Template>
      <main>
        <section className="menu section mt-[9rem]">
          <div className="title">
            {/* <h2>Our Menu</h2> */}
            <div className="underline"></div>
          </div>
          <MenuButtons categories={categories} filterItems={filterItems} />

          <MenuCard items={menuItems} />
        </section>
      </main>
    </Template>
  );
}

export default Menus;

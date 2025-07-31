// import React, { useEffect, useState } from "react";
// import { menu } from "../constants/product";
// import MenuButtons from "../components/MenuButtons";
// import MenuCard from "../components/MenuCard";
// import Template from "../components/Template";
// import { useLocation } from "react-router-dom";

// const fetchItems = async () => {
//   try {
//     const res = await fetch("localhost:5000/api/v1/menu/");
//     const data = await res.json();

//     console.log(data);
//     return data;
//   } catch (error) {
//     throw new Error("could not fetch data from");
//   }
// };

// // fetchItems();
// function Menus() {
//   const location = useLocation();
//   const queryString = location.search;

//   const queryParams = new URLSearchParams(queryString).get("category");
//   const [menuItems, setMenuItems] = useState(menu);
//   const categories = ["all", ...new Set(menu.map((item) => item.category))];

//   const filterItems = (category) => {
//     if (category === "all") {
//       setMenuItems(menu);
//     } else {
//       const filteredItem = menu.filter((item) => item.category === category);
//       setMenuItems(filteredItem);
//     }
//   };
//   useEffect(() => {
//     if (queryParams) {
//       filterItems(queryParams);
//     }
//   }, [queryParams]);
//   return (
//     <Template>
//       <main>
//         <section className="menu section mt-[9rem]">
//           <div className="title">
//             {/* <h2>Our Menu</h2> */}
//             <div className="underline"></div>
//           </div>
//           <MenuButtons categories={categories} filterItems={filterItems} />

//           <MenuCard items={menuItems} />
//         </section>
//       </main>
//     </Template>
//   );
// }

// export default Menus;

import React, { useEffect, useState } from "react";
import MenuButtons from "../components/MenuButtons";
import MenuCard from "../components/MenuCard";
import Template from "../components/Template";
import { useLocation } from "react-router-dom";

function Menus() {
  const API_URL =
    "https://improved-danell-gentlebot-a7291aca.koyeb.app/api/v1/menu";
  const location = useLocation();
  const queryString = location.search;
  const queryParams = new URLSearchParams(queryString).get("category");

  const [menuItems, setMenuItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        console.log("fetched data sucessfully");
      } else {
        throw new Error("could not fetch data");
      }
      const data = await res.json();
      setMenuItems(data.menu);
      setAllItems(data.menu);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(allItems);
    } else {
      const filtered = allItems.filter((item) => item.category === category);
      setMenuItems(filtered);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (queryParams && allItems.length > 0) {
      filterItems(queryParams);
    }
  }, [queryParams, allItems]);

  const categories = ["all", ...new Set(allItems.map((item) => item.category))];

  return (
    <Template>
      <main>
        <section className="menu section mt-[9rem]">
          <div className="title">
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

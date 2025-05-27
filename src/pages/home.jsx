import React from "react";
import Template from "../components/Template";
import Slide from "../components/Slide";
import Usedbtns from "../components/Usedbtns";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <Template>
      <section>
        <div className="hero-section mt-10 ">
          <Slide />
        </div>
        <div className="flex mt-10 gap-5 justify-center w-full">
          <Usedbtns title={"Our Menu"} primary link="/menus" />
          <Usedbtns title={"Order Now"} link="/orders" />
        </div>
        <div className="mt-10">
          <h3 className="ml-10 font-bold text-2xl text-blue">Categories:</h3>
          <Categories />
        </div>
      </section>
      ;
    </Template>
  );
};

export default Home;

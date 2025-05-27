import React, { useState } from "react";
function MenuButtons({ categories, filterItems }) {
  const [indexValue, setIndexValue] = useState(0);
  const handleSelect = (category, index) => {
    filterItems(category);
    setIndexValue(index);
    console.log(index, indexValue, "click button");

    // if (indexValue === index) {
    // }
  };
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-center font-bold text-[34px] mb-[2rem] p-3 border-black border-b-[3px] w-fit text-blue">
        My Menu
      </h2>

      {/* Scrollable container */}
      <div className="w-full overflow-x-auto hide-scrollbar flex sm:justify-center mb-11">
        <div className="flex gap-5 px-4 w-max min-w-fit">
          {categories.map((category, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleSelect(category, index)}
              className={`${
                indexValue === index ? "bg-blue text-white" : ""
              } border-2 p-2 border-blue hover:bg-blue hover:text-white capitalize text-base rounded-lg cursor-pointer tracking-[1px] font-medium whitespace-nowrap`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuButtons;

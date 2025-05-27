import React from "react";
import { Link } from "react-router-dom";

const Usedbtns = ({ title, icon, link, primary }) => {
  const classes = `${
    primary
      ? "bg-blue text-white font-normal hover:bg-transparent hover:border-[2px] hover:border-blue hover:text-blue font-bold"
      : "border-[2px] border-blue text-blue  bg-white hover:bg-blue hover:text-white"
  } rounded-md flex text-center gap-2 h-10 items-center p-4 justify-between font-bold `;

  if (link) {
    return (
      <Link to={link} className={classes}>
        <p>{title}</p>
      </Link>
    );
  }

  return (
    <button className={classes}>
      <p>{title}</p> {icon}
    </button>
  );
};

export default Usedbtns;

import React from "react";
import { Link } from "react-router-dom";

function ReuseableBtn({ title, icon, primary, link }) {
  const classes = `${
    primary ? "bg-blue" : "border border-primary text-primary"
  } rounded-md flex gap-2 h-10 items-center p-4 justify-between text-white`;

  if (link) {
    return (
      <Link to={link} className={classes}>
        <p>{title}</p>
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes}>
      <p>{title}</p>
      {icon}
    </button>
  );
}

export default ReuseableBtn;

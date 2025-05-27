import React from "react";
import { Link } from "react-router-dom";

const FootLinks = ({ title, link, icon }) => {
  if (link) {
    return (
      <Link to={link}>
        <div className="flex gap-2 items-center font-semibold mt-3">
          {icon} <h4 className="capitalize ">{title}</h4>
        </div>
      </Link>
    );
  }
  return (
    <div className="flex gap-2 items-center font-semibold">
      {icon} <h4 className="capitalize ">{title}</h4>
    </div>
  );
};

export default FootLinks;

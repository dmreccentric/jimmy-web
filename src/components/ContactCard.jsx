import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ icon, img, title, link }) => {
  const cardContent = (
    <div
      style={{
        backgroundImage: `url(${
          img ||
          "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1748292542/Jimmy%E2%80%99s%20web/cocepaizfhyiu8jjhm8v.jpg"
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="flex border-blue rounded-md border-[2px] justify-center  text-white bg-neutral-900   font-bold w-fit mt-3 p-3 min-w-[300px] min-h-[4rem]"
    >
      <h2 className="flex bg-black/50 px-3 rounded gap-4 items-center ">
        {icon} Contact me on {title}
      </h2>
    </div>
  );

  return link ? <Link to={link}>{cardContent}</Link> : cardContent;
};

export default ContactCard;

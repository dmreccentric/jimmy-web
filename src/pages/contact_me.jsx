import React from "react";
import ContactCard from "../components/ContactCard";
import {
  FaTiktok,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsappSquare,
} from "react-icons/fa";
import Template from "../components/Template";

const contactData = [
  {
    title: "TikTok",
    icon: <FaTiktok />,
    img: "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1748297221/Jimmy%E2%80%99s%20web/cevyrfjcw91gves5z0ua.jpg",
    link: "https://tiktok.com",
  },
  {
    title: "Instagram",
    icon: <FaInstagram />,
    img: "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1748297337/Jimmy%E2%80%99s%20web/jowbxspegdfbz495ygfn.jpg",
    link: "https://instagram.com",
  },
  {
    title: "Whatsapp",
    icon: <FaWhatsappSquare />,
    img: "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1748292542/Jimmy%E2%80%99s%20web/cocepaizfhyiu8jjhm8v.jpg",
    link: "https://facebook.com",
  },
];

function ContactMe() {
  return (
    <Template>
      <div>
        <h1 className="capitalize font-extrabold text-[2rem] text-blue text-center mt-[8rem]">
          Contact me VIA any of my social media handles
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 mt-[2rem] mb-[4rem]">
        {contactData.map((item, index) => (
          <ContactCard
            key={index}
            title={item.title}
            icon={item.icon}
            img={item.img}
            link={item.link}
          />
        ))}
      </div>
    </Template>
  );
}

export default ContactMe;

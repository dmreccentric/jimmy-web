import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import FootLinks from "./FootLinks";
import { FaTiktok } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Usedbtns from "./Usedbtns";
import { MdOutlineCopyright } from "react-icons/md";
import { GoArrowDownRight } from "react-icons/go";

const Footer = () => {
  return (
    <div className="bg-blue text-white flex flex-col justify-center">
      <div>
        <h2 className="capitalize font-bold text-3xl mb-3 font-archivo text-center mt-4">
          subscribe to my whatsapp status
        </h2>
        <p className="capitalize font-medium text-center  mb-3">
          so you can receive timely updates from us
        </p>
        <div className="flex justify-center space-x-1 items-center mt-10 mb-14">
          {/* <label className="font-semibold text-lg" htmlFor="number">
            Number:
          </label> */}
          <input
            type="tel"
            name="Number"
            id="number"
            placeholder="Enter Your Whatsapp Number"
            className="ml-2 h-10 p-2 md:w-72 w-60 border-[1px] border-white rounded-lg active:border-orange text-black "
          />{" "}
          <Usedbtns title={"Subscribe"} icon={<FaArrowRightLong />} />
        </div>
      </div>
      <h2 className="capitalize text-6xl font-bold flex text-end ml-2 mb-14">
        lets talk <GoArrowDownRight className="h-20" />
      </h2>
      <div className="space-y-4 ml-2">
        {" "}
        <FootLinks title={"080-5093-9208"} icon={<BiSolidPhoneCall />} />
        <FootLinks title={"JIMMYS TREAT"} icon={<FaTiktok />} />
        <FootLinks title={"JIMMYS TREAT"} icon={<FaSquareInstagram />} />
        <FootLinks
          title={"MEGA SCREEN GWAGWALADA FCT ABUJA"}
          link={"https://maps.app.goo.gl/HJMFuXxN4M2NFiADA"}
          icon={<MdLocationPin />}
        />
      </div>
      <hr className="border-t border-gray-300 my-6 m-5" />

      <div className="mb-16 ">
        <p className="capitalize flex text-center justify-center">
          All rights reserved <MdOutlineCopyright className="mr-1 ml-1" />{" "}
          jimmys treat 2025{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;

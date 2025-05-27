import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../assets/first_treat.jpg";
import slide2 from "../assets/second-treat.jpg";
import slide3 from "../assets/third-treat.jpg";
import slide4 from "../assets/fifth-treat.jpg";
import slide5 from "../assets/sixth-treat.jpg";

const images = [slide1, slide2, slide3, slide4, slide5];

const Slide = () => {
  return (
    <Swiper
      modules={[Pagination]}
      Pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          {" "}
          <div className="w-5/6 md:w-3/5  md:h-64 md:mt-20 rounded-3xl border-solid mx-auto border-blue border-2  mt-10">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full rounded-3xl object-fill"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;

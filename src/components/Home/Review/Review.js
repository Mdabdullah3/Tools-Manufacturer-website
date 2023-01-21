import React from "react";
import UseReview from "../../../Hooks/UseReview";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import './Review.css'
import { AiTwotoneStar } from 'react-icons/ai';

const Review = () => {
  const [review] = UseReview();
  const reverse = [...review].reverse();
  return (
    <>
      <h1 className="text-center text-xl text-secondary mt-36 font-semibold font-mono">
        Customers Reviews
      </h1>
      <h1 className="text-center text-3xl capitalize text-primary font-semibold font-mono">
        What Our Customers Says
      </h1>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper w-8/12"
      >
        <>
          {reverse.slice(0, 6).map((item) => (
            <SwiperSlide>
              <div className="card card-side grid md:grid-cols-2 pb-14 pt-20 grid-cols-1 px-2 items-center">
                <img className="w-72 h-80 mx-auto" src={item.img} alt="" />
                <div className="items-center font-mono">
                  <h2 className="text-secondary mb-2 text-xl font-semibold">
                    {item.name}
                  </h2>
                  <h2 className="text-secondary text-3xl font-semibold">
                    {item.address}
                  </h2>

                  <p className="text-secondary text-[18px] mt-4">{item.description}.</p>
                  <div className="flex justify-start mt-3 gap-3">
                    {Array?.from(Array(parseInt(item?.rating)), (e, i) => (
                      <AiTwotoneStar
                        key={i}
                        className="w-6 text-4xl text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </>
  );
};

export default Review;
